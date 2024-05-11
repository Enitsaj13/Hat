import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { i18n, i18nOptions } from "@i18n/index";
import { colors } from "@theme/index";
import NoteModal from "@components/Notes";
import { useMomentSchemaFormRef } from "@app/(app)/(tabs)/(one)/MainScreen/helpers";
import { Controller } from "react-hook-form";
import { useBatchObservation } from "@hooks/useBatchObservation";
import {
  SendFeedbackRequest,
  SendObservationDataRequest,
} from "../../../../../types";
import { database } from "@stores/index";
import { SendStatus, ToSendDatus, ToSendDatusType } from "@stores/toSendDatus";
import { styles } from "./styles";
import { Q } from "@nozbe/watermelondb";
import { Worker } from "@stores/worker";
import cloneDeep from "lodash.clonedeep";
import { useLocalSearchParams } from "expo-router";
import { boolean } from "yup";

interface IAuditSummary {
  saved: number;
  sent: number;
  hcwStatus: Map<number, { name: string; count: number }>;
  momentCompliance: Map<number, { passed: number; failed: number }>;
}

const auditSummaryInitialState = Object.freeze({
  saved: 0,
  sent: 0,
  hcwStatus: new Map<number, { name: string; count: number }>(),
  momentCompliance: new Map<number, { passed: number; failed: number }>(),
});

async function transformToSendDataToReport(toSendData: ToSendDatus[]) {
  const s: IAuditSummary = cloneDeep(auditSummaryInitialState);

  const hcw = await database
    .get<Worker>("workers")
    .query(Q.sortBy("list_order"))
    .fetch();
  hcw.forEach((w) => s.hcwStatus.set(w.serverId, { name: w.name, count: 0 }));
  [1, 2, 3, 4, 5].forEach((v) =>
    s.momentCompliance.set(v, { passed: 0, failed: 0 }),
  );

  for (const toSendDatus of toSendData) {
    if (toSendDatus.status === SendStatus.SENT) {
      s.sent = s.sent + 1;
    } else {
      s.saved = s.saved + 1;
    }

    const body = toSendDatus.body as SendObservationDataRequest;
    const hcwStat = s.hcwStatus.get(body.hcw_title)!;
    s.hcwStatus.set(body.hcw_title, {
      ...hcwStat,
      count: hcwStat!.count + 1,
    });
    if (body.hh_compliance !== "missed") {
      body.moment.forEach((m) => {
        const momentStat = s.momentCompliance.get(m)!;
        s.momentCompliance.set(m, {
          ...momentStat,
          passed: momentStat.passed + 1,
        });
      });
    } else {
      body.moment.forEach((m) => {
        const momentStat = s.momentCompliance.get(m)!;
        s.momentCompliance.set(m, {
          ...momentStat,
          failed: momentStat.failed + 1,
        });
      });
    }
  }

  const finalHcwStatus = new Map<number, { name: string; count: number }>();
  for (const [hcwServerId, value] of s.hcwStatus.entries()) {
    if (value.count > 0) {
      finalHcwStatus.set(hcwServerId, value);
    }
  }
  s.hcwStatus = finalHcwStatus;

  const finalMomentCompliance = new Map<
    number,
    { passed: number; failed: number }
  >();
  for (const [moment, momentStat] of s.momentCompliance.entries()) {
    if (momentStat.passed > 0 || momentStat.failed > 0) {
      finalMomentCompliance.set(moment, momentStat);
    }
  }
  s.momentCompliance = finalMomentCompliance;
  return s;
}

const AuditSummary = () => {
  const formRef = useMomentSchemaFormRef();
  const form = formRef.current!;
  const { control, setValue, watch } = form;
  const [showNoteModal, setShowNoteModal] = useState(false);

  const { batchObservationState } = useBatchObservation();

  const [summary, setSummary] = useState<IAuditSummary>(
    auditSummaryInitialState,
  );
  const { hideFeedbackGiven = false } = useLocalSearchParams<{
    hideFeedbackGiven: string;
  }>();

  const transformToSendData = useCallback(() => {
    (async () => {
      console.log("summary before transform", summary);
      const toSendData = await database
        .get<ToSendDatus>("to_send_data")
        .query(
          Q.and(
            Q.where("key", batchObservationState.guid),
            Q.where("type", ToSendDatusType.OBSERVATION),
          ),
        )
        .fetch();
      const transformed = await transformToSendDataToReport(toSendData);
      console.log("summary to be set", transformed);
      setSummary(transformed!);
    })();
  }, []);

  useEffect(transformToSendData, []);

  const onFeedbackSave = useCallback(
    async (feedback?: string) => {
      const sendObservationDataRequest: SendFeedbackRequest = {
        batch_uuid: batchObservationState.guid,
        notes: feedback,
      };

      const db = database.get<ToSendDatus>("to_send_data");
      await database.write(async () => {
        await db.create((newToSendDatus) => {
          newToSendDatus.body = sendObservationDataRequest;
          newToSendDatus.url = "/mobile/update-feedback-given";
          newToSendDatus.type = ToSendDatusType.FEEDBACK;
          newToSendDatus.status = SendStatus.IDLE;
          newToSendDatus.key = batchObservationState.guid;
        });
      });
    },
    [batchObservationState.guid],
  );

  const completed = summary.saved + summary.sent;
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator
    >
      <View style={styles.rowContainer}>
        <Text style={styles.textTable}>
          {i18n.t("AH2", {
            defaultValue: "Target Opportunities",
          })}
        </Text>
        <Text style={styles.textTable}>
          {i18n.formatNumber(
            batchObservationState.targetOpportunities + completed,
            i18nOptions.countFormatOptions,
          )}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textTable}>
          {i18n.t("AH3", {
            defaultValue: "Completed",
          })}
        </Text>
        <Text style={styles.textTable}>
          {i18n.formatNumber(completed, i18nOptions.countFormatOptions)}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textTable}>
          {i18n.t("AH4", {
            defaultValue: "Saved in Device",
          })}
        </Text>
        <Text style={styles.textTable}>
          {i18n.formatNumber(summary.saved, i18nOptions.countFormatOptions)}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textTable}>
          {i18n.t("AH5", {
            defaultValue: "Submitted to Server",
          })}
        </Text>
        <Text style={styles.textTable}>
          {i18n.formatNumber(summary.sent, i18nOptions.countFormatOptions)}
        </Text>
      </View>
      {!Boolean(hideFeedbackGiven) && (
        <>
          <View style={styles.handHygieneContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.handHygieneText}>
                {i18n.t("DL5", {
                  defaultValue: "Hand Hygiene Compliance",
                })}
              </Text>
            </View>
            <View style={styles.handHygienePercentContainer}>
              <Text style={styles.handHygieneText}>%</Text>
            </View>
          </View>
          <Controller
            render={({ field: { onChange, value } }) => (
              <View style={styles.feedbackContainer}>
                <Pressable
                  style={styles.feedbackTextContainer}
                  onPress={() => onChange(!value)}
                >
                  <Text style={styles.handHygieneText}>
                    {i18n.t("FEED1", {
                      defaultValue: "Feedback Given?",
                    })}
                  </Text>
                </Pressable>

                <View style={styles.feedbackButtonContainer}>
                  <Switch
                    trackColor={{ true: colors.mediumPurple }}
                    thumbColor={value ? colors.lilyWhite : colors.textColor}
                    ios_backgroundColor={colors.cadetGrey}
                    style={styles.switchIndication}
                    onValueChange={async (v) => {
                      onChange(v);
                      if (!v) {
                        // TODO KNOWN UI BUG, set here does not seem to work.
                        // seems that we are hitting the limitation of react-hook-form
                        // to make this work, it seems that we need to breakdown the form
                        // but this is only a UI bug, the feedback to be sent to server is still empty when switch is turned to false
                        setValue("feedback", "");
                        await onFeedbackSave("");
                      }
                    }}
                    value={value}
                    hitSlop={{ right: -30 }}
                  />

                  <Icon
                    name="edit"
                    size={20}
                    color={value ? colors.textColor : colors.cadetGrey}
                    onPress={() => {
                      if (value) {
                        setShowNoteModal(true);
                      }
                    }}
                    hitSlop={{ left: 30, right: 10, top: 10, bottom: 10 }}
                  />
                </View>
              </View>
            )}
            name="feedbackEnabled"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <NoteModal
                value={value}
                visible={showNoteModal}
                onClose={() => setShowNoteModal(false)}
                title={i18n.t("FEED2", {
                  defaultValue: "Add Feedback Notes",
                })}
                cancelTitle={i18n.t("I3", { defaultValue: "Cancel" })}
                saveTitle={i18n.t("AE7", { defaultValue: "Send" })}
                maxLength={150}
                onSave={(feedback) => {
                  onChange(feedback);
                  onFeedbackSave(feedback);
                }}
              />
            )}
            name="feedback"
            control={control}
          />
        </>
      )}
      <View style={styles.titleLabelContainer}>
        <Text style={styles.healthCareTitle}>
          {i18n.t("ADD7", {
            defaultValue: "HealthCare Worker Details",
          })}
        </Text>
        <View style={styles.countPercentTitleContainer}>
          <View
            style={{
              width: "20%",
            }}
          >
            <Text style={styles.textRow}>
              {i18n.t("ADD8", {
                defaultValue: "Count",
              })}
            </Text>
          </View>
          <View
            style={{
              width: "20%",
            }}
          >
            <Text style={styles.textRow}>
              {i18n.t("W19", {
                defaultValue: "Percent",
              })}
            </Text>
          </View>
        </View>
      </View>
      {Array.from(summary.hcwStatus).map(([serverId, hcwStat]) => (
        <View style={styles.tableContainer} key={`hcw-${serverId}`}>
          <View style={styles.totalContainer}>
            <Text style={styles.textTotal}>{hcwStat.name}</Text>
          </View>
          <View style={styles.countPercentContainer}>
            <Text style={styles.tableText}>
              {i18n.formatNumber(hcwStat.count, i18nOptions.countFormatOptions)}
            </Text>
          </View>
          <View style={styles.countPercentContainer}>
            <Text style={styles.tableText}>
              {i18n.formatNumber(
                (hcwStat.count / completed) * 100,
                i18nOptions.percentageFormatOptions,
              )}
              %
            </Text>
          </View>
        </View>
      ))}
      <View style={styles.tableContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.textTotal}>
            {i18n.t("W13", {
              defaultValue: "TOTAL",
            })}
          </Text>
        </View>
        <View style={styles.countPercentContainer}>
          <Text style={styles.tableText}>
            {i18n.formatNumber(completed, i18nOptions.countFormatOptions)}
          </Text>
        </View>
        <View style={styles.countPercentContainer}>
          <Text style={styles.tableText}>
            {i18n.formatNumber(100, i18nOptions.percentageFormatOptions)}%
          </Text>
        </View>
      </View>
      <View style={styles.titleLabelContainer}>
        <Text style={styles.healthCareTitle}>
          {i18n.t("W14", {
            defaultValue: "COMPLIANCE DETAILS - by Moments",
          })}
        </Text>
        <View style={styles.complianceDetailsContainer}>
          <Text style={styles.textRow}>
            {i18n.t("AH7", {
              defaultValue: "Moment",
            })}
          </Text>
          <Text style={styles.textRow}>
            {i18n.t("ADD8", {
              defaultValue: "Count",
            })}
          </Text>
          <Text style={styles.textRow}>
            {i18n.t("AH9", {
              defaultValue: "Passed",
            })}
          </Text>
          <Text style={styles.textRow}>
            {i18n.t("AH10", {
              defaultValue: "Failed",
            })}
          </Text>
          <Text style={styles.textRow}>
            {i18n.t("W19", {
              defaultValue: "Percent",
            })}
          </Text>
        </View>
      </View>
      {Array.from(summary.momentCompliance).map(([moment, momentStat]) => (
        <View
          style={[styles.tableContainer, styles.tableCompliance]}
          key={`moment-${moment}`}
        >
          <View style={styles.tableComplianceContainer}>
            <Text style={styles.tableText}>{moment}</Text>
          </View>
          <View style={styles.tableComplianceContainer}>
            <Text style={styles.tableText}>
              {i18n.formatNumber(
                momentStat.passed + momentStat.failed,
                i18nOptions.countFormatOptions,
              )}
            </Text>
          </View>
          <View style={styles.tableComplianceContainer}>
            <Text style={styles.tableText}>
              {i18n.formatNumber(
                momentStat.passed,
                i18nOptions.countFormatOptions,
              )}
            </Text>
          </View>
          <View style={styles.tableComplianceContainer}>
            <Text style={styles.tableText}>
              {i18n.formatNumber(
                momentStat.failed,
                i18nOptions.countFormatOptions,
              )}
            </Text>
          </View>
          <View style={styles.tableComplianceContainer}>
            <Text style={styles.tableText}>
              {i18n.formatNumber(
                (momentStat.passed / (momentStat.passed + momentStat.failed)) *
                100,
                i18nOptions.countFormatOptions,
              )}
              %
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AuditSummary;