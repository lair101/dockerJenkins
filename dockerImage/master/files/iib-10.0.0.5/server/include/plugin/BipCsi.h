/*
 * Licensed Materials - Property of IBM
 * ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 * (C) Copyright IBM Corp. 1999, 2016
 */

#ifndef BipCsi_h
#define BipCsi_h

#ifdef __cplusplus
extern "C" {
#endif

#include <BipCci.h>

/**
 * An enumeration of possible versions for a statistics record.
 */
typedef enum _CsiStatsRecordVersion {
  CSI_STATS_RECORD_VERSION_1 = 0,
  CSI_STATS_RECORD_VERSION_CURRENT = 0
} CsiStatsRecordVersion;

/**
 * An enumeration of possible types for a statistics record.
 */
typedef enum _CsiStatsRecordType {
  CSI_STATS_RECORD_TYPE_ARCHIVE,
  CSI_STATS_RECORD_TYPE_SNAPSHOT
} CsiStatsRecordType;

/**
 * An enumeration of possible record codes for a statistics record.
 */
typedef enum _CsiStatsRecordCode {
  CSI_STATS_RECORD_CODE_NONE,
  CSI_STATS_RECORD_CODE_MAJORINTERVAL,
  CSI_STATS_RECORD_CODE_SNAPSHOT,
  CSI_STATS_RECORD_CODE_SHUTDOWN,
  CSI_STATS_RECORD_CODE_REDEPLOY,
  CSI_STATS_RECORD_CODE_STATS_SETTINGS_MODIFIED,
  CSI_STATS_RECORD_CODE_STOP
} CsiStatsRecordCode;

/**
 * An enumeration of possible types for a terminal in a statistics record.
 */
typedef enum _CsiStatsTerminalType {
  CSI_STATS_TERMINAL_TYPE_INPUT,
  CSI_STATS_TERMINAL_TYPE_OUTPUT
} CsiStatsTerminalType;

/**
 * A statistics record for a specific message flow.
 */
typedef struct _CsiStatsRecordMessageFlow {
  const CciChar* brokerLabel;
  const CciChar* brokerUUID;
  const CciChar* executionGroupName;
  const CciChar* executionGroupUUID;
  const CciChar* messageFlowName;
  const CciChar* messageFlowUUID;
  const CciChar* applicationName;
  const CciChar* applicationUUID;
  const CciChar* libraryName;
  const CciChar* libraryUUID;
  struct CciDate startDate;
  struct CciTime startTime;
  struct CciTimestamp gmtStartTime;
  struct CciDate endDate;
  struct CciTime endTime;
  struct CciTimestamp gmtEndTime;
  CciInt totalElapsedTime;
  CciInt maximumElapsedTime;
  CciInt minimumElapsedTime;
  CciInt totalCPUTime;
  CciInt maximumCPUTime;
  CciInt minimumCPUTime;
  CciInt cpuTimeWaitingForInputMessage;
  CciInt elapsedTimeWaitingForInputMessage;
  CciCount totalInputMessages;
  CciInt totalSizeOfInputMessages;
  CciInt maximumSizeOfInputMessages;
  CciInt minimumSizeOfInputMessages;
  CciCount numberOfThreadsInPool;
  CciCount timesMaximumNumberOfThreadsReached;
  CciCount totalNumberOfMQErrors;
  CciCount totalNumberOfMessagesWithErrors;
  CciCount totalNumberOfErrorsProcessingMessages;
  CciCount totalNumberOfTimeOutsWaitingForRepliesToAggregateMessages;
  CciCount totalNumberOfCommits;
  CciCount totalNumberOfBackouts;
  const CciChar* accountingOrigin;
} CsiStatsRecordMessageFlow;

/**
 * A statistics record for a specific message flow thread.
 */
typedef struct _CsiStatsRecordThread {
  CciInt number;
  CciCount totalNumberOfInputMessages;
  CciInt totalElapsedTime;
  CciInt totalCPUTime;
  CciInt cpuTimeWaitingForInputMessage;
  CciInt elapsedTimeWaitingForInputMessage;
  CciInt totalSizeOfInputMessages;
  CciInt maximumSizeOfInputMessages;
  CciInt minimumSizeOfInputMessages;
} CsiStatsRecordThread;

/**
 * A statistics record for a specific terminal of a specific message flow node.
 */
typedef struct _CsiStatsRecordTerminal {
  const CciChar* label;
  CsiStatsTerminalType type;
  CciCount countOfInvocations;
} CsiStatsRecordTerminal;

/**
 * A statistics record for a specific message flow node.
 */
typedef struct _CsiStatsRecordNode {
  const CciChar* label;
  const CciChar* type;
  CciInt totalElapsedTime;
  CciInt maximumElapsedTime;
  CciInt minimumElapsedTime;
  CciInt totalCPUTime;
  CciInt maximumCPUTime;
  CciInt minimumCPUTime;
  CciCount countOfInvocations;
  CciCount numberOfInputTerminals;
  CciCount numberOfOutputTerminals;
  CciCount numberOfTerminals;
  const CsiStatsRecordTerminal* terminals;
} CsiStatsRecordNode;

/**
 * A statistics record that will get sent to a statistics writer.
 */
typedef struct _CsiStatsRecord {
  CsiStatsRecordVersion version;
  CsiStatsRecordType type;
  CsiStatsRecordCode code;
  CsiStatsRecordMessageFlow messageFlow;
  CciCount numberOfThreads;
  const CsiStatsRecordThread* threads;
  CciCount numberOfNodes;
  const CsiStatsRecordNode* nodes;
} CsiStatsRecord;

/**
 * A virtual function table for a statistics writer.
 */
typedef struct _CsiStatsWriterVft {
  int _reserved[2];
  char _structureID[4];
  CsiStatsRecordVersion _version;
  CciSize (*getAttributeName)(int*, int, CciChar*, CciSize, void*);
  CciSize (*getAttribute)(int*, const CciChar*, CciChar*, CciSize, void*);
  void (*setAttribute)(int*, const CciChar*, const CciChar*, void*);
  void (*write)(const CsiStatsRecord*, void*);
} CsiStatsWriterVft;

/**
 * An initializer for the virtual function table for a statistics writer.
 */
#define CSI_STATS_WRITER_VFT_DEFAULT { 0L, 0L }, \
                                     { 'C', 'S', 'W', 'R' }, \
                                     CSI_STATS_RECORD_VERSION_CURRENT, \
                                     0L, \
                                     0L, \
                                     0L, \
                                     0L

/**
 * A statistics writer.
 */
typedef void CsiStatsWriter;

/**
 * Create a new statistics writer.
 */
CsiStatsWriter ImportExportPrefix * ImportExportSuffix csiCreateStatsWriter(
  int* returnCode,
  const CciChar* resourceName,
  const CciChar* formatName,
  const CsiStatsWriterVft* vft,
  void* context
);

#ifdef __cplusplus
}
#endif

#endif /* BipCsi_h */
