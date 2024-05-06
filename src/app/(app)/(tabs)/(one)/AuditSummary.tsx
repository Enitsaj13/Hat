import React, { useCallback, useMemo, useState } from "react";
import { Text, View, ScrollView, Switch, Pressable } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { Feather as Icon } from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import NoteModal from "@components/Notes";
import { useMomentSchemaFormRef } from "@app/(app)/(tabs)/(one)/MainScreen/helpers";
import { Controller } from "react-hook-form";
import { useBatchObservation } from "@hooks/useBatchObservation";
import {
  getAnswer,
  HhComplianceType,
  SendFeedbackRequest,
  SendObservationDataRequest,
} from "../../../../types";
import { randomUUID } from "expo-crypto";
import isEmpty from "lodash.isempty";
import { database } from "@stores/index";
import { SendStatus, ToSendDatus, ToSendDatusType } from "@stores/toSendDatus";

const AuditSummary = () => {
  const formRef = useMomentSchemaFormRef();
  const form = formRef.current!;
  const { control, setValue, watch } = form;
  const [showNoteModal, setShowNoteModal] = useState(false);

  const { batchObservationState } = useBatchObservation();
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
        <Text style={styles.textTable}>2</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textTable}>
          {i18n.t("AH3", {
            defaultValue: "Completed",
          })}
        </Text>
        <Text style={styles.textTable}>2</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textTable}>
          {i18n.t("AH4", {
            defaultValue: "Saved in Device",
          })}
        </Text>
        <Text style={styles.textTable}>2</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textTable}>
          {i18n.t("AH5", {
            defaultValue: "Submitted to Server",
          })}
        </Text>
        <Text style={styles.textTable}>2</Text>
      </View>
      <View style={styles.handHygieneContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.handHygieneText}>
            {i18n.t("DL5", {
              defaultValue: "Hand Hygiend Compliance",
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
                  defaultValue: "Feeback Given?",
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
      <View style={styles.titleLabelContainer}>
        <Text style={styles.healthCareTitle}>
          {i18n.t("ADD7", {
            defaultValue: "HealthCare Worker Details",
          })}
        </Text>
        <View style={styles.countPercentTitleContainer}>
          <Text style={styles.textRow}>
            {i18n.t("ADD8", {
              defaultValue: "Count",
            })}
          </Text>
          <Text style={styles.textRow}>
            {i18n.t("W19", {
              defaultValue: "Percent",
            })}
          </Text>
        </View>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.textTotal}>Doctor</Text>
        </View>
        <View style={styles.countPercentContainer}>
          <Text style={styles.tableText}>2</Text>
        </View>
        <View style={styles.countPercentContainer}>
          <Text style={styles.tableText}>100%</Text>
        </View>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.textTotal}>
            {i18n.t("W13", {
              defaultValue: "TOTAL",
            })}
          </Text>
        </View>
        <View style={styles.countPercentContainer}>
          <Text style={styles.tableText}>2</Text>
        </View>
        <View style={styles.countPercentContainer}>
          <Text style={styles.tableText}>100%</Text>
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
      <View style={[styles.tableContainer, styles.tableCompliance]}>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>3</Text>
        </View>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>1</Text>
        </View>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>0</Text>
        </View>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>1</Text>
        </View>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>0%</Text>
        </View>
      </View>
      <View style={[styles.tableContainer, styles.tableCompliance]}>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>4</Text>
        </View>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>1</Text>
        </View>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>0</Text>
        </View>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>1</Text>
        </View>
        <View style={styles.tableComplianceContainer}>
          <Text style={styles.tableText}>0%</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = createStyleSheet({
  container: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 0.4,
    borderColor: colors.green,
  },
  textTable: {
    color: colors.textColor,
    fontSize: 16,
  },
  titleLabelContainer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: colors.green,
  },
  healthCareTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.textColor,
  },
  textRow: {
    fontSize: 14,
    color: colors.textColor,
    marginHorizontal: 14,
  },
  countPercentTitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 14,
    width: "100%",
  },
  countPercentContainer: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.4,
    borderColor: colors.green,
  },
  tableContainer: {
    backgroundColor: colors.bgColor,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    borderBottomWidth: 0.4,
    borderColor: colors.green,
  },
  tableText: {
    fontSize: 14,
    color: colors.textColor,
    textAlign: "center",
  },
  totalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    borderRightWidth: 0.4,
    borderColor: colors.green,
  },
  textTotal: {
    fontSize: 14,
    color: colors.textColor,
    textAlign: "center",
  },
  complianceDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 14,
    width: "100%",
  },
  tableCompliance: {
    justifyContent: "space-evenly",
  },
  tableComplianceContainer: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRightWidth: 0.4,
    borderColor: colors.green,
  },
  handHygieneContainer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.textColor,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  handHygieneText: {
    color: colors.textColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  handHygienePercentContainer: {
    width: "5%",
  },
  feedbackContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 2,
    borderColor: colors.textColor,
    paddingHorizontal: 12,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  feedbackTextContainer: {
    width: "70%",
    alignItems: "flex-start",
  },
  feedbackButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "25%",
    marginHorizontal: 18,
  },
  switchIndication: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  },
});

export default AuditSummary;
