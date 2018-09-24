/**
 * @file BipRfc.h
 *
 * Definitions for MQRFH2 Name Value data.
 */
/**********************************************************************/
/* Licensed Materials - Property of IBM                               */
/* ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63 */
/*                                                                    */
/* (C) Copyright IBM Corporation 1999, 2000.                          */
/**********************************************************************/

#ifndef BipRfc_h
#define BipRfc_h

/* Include standard MQ definitions */

#include <cmqc.h>
#include <cmqcfc.h>

#ifdef __cplusplus
extern "C" {
#endif

/*********************************************************************/
/* RFH2 Top-level folder Tags                                        */
/*********************************************************************/

#ifndef MQRFH2_NAME_VALUE_VERSION
#define MQRFH2_NAME_VALUE_VERSION 1

/* Tag names */
#define MQRFH2_PUBSUB_CMD_FOLDER       "psc"
#define MQRFH2_PUBSUB_RESP_FOLDER      "pscr"
#define MQRFH2_MSG_CONTENT_FOLDER      "mcd"
#define MQRFH2_USER_FOLDER             "usr"

/* Tag names as character arrays */
#define MQRFH2_PUBSUB_CMD_FOLDER_A     'p','s','c'
#define MQRFH2_PUBSUB_RESP_FOLDER_A    'p','s','c','r'
#define MQRFH2_MSG_CONTENT_FOLDER_A    'm','c','d'
#define MQRFH2_USER_FOLDER_A           'u','s','r'

/* XML tag names */
#define MQRFH2_PUBSUB_CMD_FOLDER_B     "<psc>"
#define MQRFH2_PUBSUB_CMD_FOLDER_E     "</psc>"
#define MQRFH2_PUBSUB_RESP_FOLDER_B    "<pscr>"
#define MQRFH2_PUBSUB_RESP_FOLDER_E    "</pscr>"
#define MQRFH2_MSG_CONTENT_FOLDER_B    "<mcd>"
#define MQRFH2_MSG_CONTENT_FOLDER_E    "</mcd>"
#define MQRFH2_USER_FOLDER_B           "<usr>"
#define MQRFH2_USER_FOLDER_E           "</usr>"

/* XML tag names as character arrays */
#define MQRFH2_PUBSUB_CMD_FOLDER_BA    '<','p','s','c','>'
#define MQRFH2_PUBSUB_CMD_FOLDER_EA    '<','/','p','s','c','>'
#define MQRFH2_PUBSUB_RESP_FOLDER_BA   '<','p','s','c','r','>'
#define MQRFH2_PUBSUB_RESP_FOLDER_EA   '<','/','p','s','c','r','>'
#define MQRFH2_MSG_CONTENT_FOLDER_BA   '<','m','c','d','>'
#define MQRFH2_MSG_CONTENT_FOLDER_EA   '<','/','m','c','d','>'
#define MQRFH2_USER_FOLDER_BA          '<','u','s','r','>'
#define MQRFH2_USER_FOLDER_EA          '<','/','u','s','r','>'

#endif /* MQRFH2_NAME_VALUE_VERSION */

/*********************************************************************/
/*  Message Content Descriptor (mcd) Tags                            */
/*********************************************************************/

#ifndef MQMCD_FOLDER_VERSION
#define MQMCD_FOLDER_VERSION 1

/* Tag names */
#define MQMCD_MSG_DOMAIN               "Msd"
#define MQMCD_MSG_SET                  "Set"
#define MQMCD_MSG_TYPE                 "Type"
#define MQMCD_MSG_FORMAT               "Fmt"

/* Tag names as character arrays */
#define MQMCD_MSG_DOMAIN_A             'M','s','d'
#define MQMCD_MSG_SET_A                'S','e','t'
#define MQMCD_MSG_TYPE_A               'T','y','p','e'
#define MQMCD_MSG_FORMAT_A             'F','m','t'

/* XML tag names */
#define MQMCD_MSG_DOMAIN_B             "<Msd>"
#define MQMCD_MSG_DOMAIN_E             "</Msd>"
#define MQMCD_MSG_SET_B                "<Set>"
#define MQMCD_MSG_SET_E                "</Set>"
#define MQMCD_MSG_TYPE_B               "<Type>"
#define MQMCD_MSG_TYPE_E               "</Type>"
#define MQMCD_MSG_FORMAT_B             "<Fmt>"
#define MQMCD_MSG_FORMAT_E             "</Fmt>"

/* XML tag names as character arrays */
#define MQMCD_MSG_DOMAIN_BA            '<','M','s','d','>'
#define MQMCD_MSG_DOMAIN_EA            '<','/','M','s','d','>'
#define MQMCD_MSG_SET_BA               '<','S','e','t','>'
#define MQMCD_MSG_SET_EA               '<','/','S','e','t','>'
#define MQMCD_MSG_TYPE_BA              '<','T','y','p','e','>'
#define MQMCD_MSG_TYPE_EA              '<','/','T','y','p','e','>'
#define MQMCD_MSG_FORMAT_BA            '<','F','m','t','>'
#define MQMCD_MSG_FORMAT_EA            '<','/','F','m','t','>'

/* Tag values */
#define MQMCD_DOMAIN_NONE              "none"
#define MQMCD_DOMAIN_NEON              "neon"
#define MQMCD_DOMAIN_MRM               "mrm"
#define MQMCD_DOMAIN_JMS_NONE          "jms_none"
#define MQMCD_DOMAIN_JMS_TEXT          "jms_text"
#define MQMCD_DOMAIN_JMS_OBJECT        "jms_object"
#define MQMCD_DOMAIN_JMS_MAP           "jms_map"
#define MQMCD_DOMAIN_JMS_STREAM        "jms_stream"
#define MQMCD_DOMAIN_JMS_BYTES         "jms_bytes"

/* Tag values as character arrays */
#define MQMCD_DOMAIN_NONE_A            'n','o','n','e'
#define MQMCD_DOMAIN_NEON_A            'n','e','o','n'
#define MQMCD_DOMAIN_MRM_A             'm','r','m'
#define MQMCD_DOMAIN_JMS_NONE_A        'j','m','s','_','n','o','n','e'
#define MQMCD_DOMAIN_JMS_TEXT_A        'j','m','s','_','t','e','x','t'
#define MQMCD_DOMAIN_JMS_OBJECT_A      'j','m','s','_','o','b','j','e','c','t'
#define MQMCD_DOMAIN_JMS_MAP_A         'j','m','s','_','m','a','p'
#define MQMCD_DOMAIN_JMS_STREAM_A      'j','m','s','_','s','t','r','e','a','m'
#define MQMCD_DOMAIN_JMS_BYTES_A       'j','m','s','_','b','y','t','e','s'

#endif /* MQMCD_FOLDER_VERSION */

/*********************************************************************/
/*  Publish/Subscribe Command Folder (psc) Tags                      */
/*********************************************************************/

#ifndef MQPSC_FOLDER_VERSION
#define MQPSC_FOLDER_VERSION 1

/* Tag names */
#define MQPSC_COMMAND                  "Command"
#define MQPSC_REGISTRATION_OPTION      "RegOpt"
#define MQPSC_PUBLICATION_OPTION       "PubOpt"
#define MQPSC_DELETE_OPTION            "DelOpt"
#define MQPSC_TOPIC                    "Topic"
#define MQPSC_SUBSCRIPTION_POINT       "SubPoint"
#define MQPSC_FILTER                   "Filter"
#define MQPSC_Q_MGR_NAME               "QMgrName"
#define MQPSC_Q_NAME                   "QName"
#define MQPSC_PUBLISH_TIMESTAMP        "PubTime"
#define MQPSC_SEQUENCE_NUMBER          "SeqNum"
#define MQPSC_SUBSCRIPTION_NAME        "SubName"
#define MQPSC_SUBSCRIPTION_IDENTITY    "SubIdentity"
#define MQPSC_SUBSCRIPTION_USER_DATA   "SubUserData"
#define MQPSC_CORREL_ID                "CorrelId"

/* Tag names as character arrays */
#define MQPSC_COMMAND_A                'C','o','m','m','a','n','d'
#define MQPSC_REGISTRATION_OPTION_A    'R','e','g','O','p','t'
#define MQPSC_PUBLICATION_OPTION_A     'P','u','b','O','p','t'
#define MQPSC_DELETE_OPTION_A          'D','e','l','O','p','t'
#define MQPSC_TOPIC_A                  'T','o','p','i','c'
#define MQPSC_SUBSCRIPTION_POINT_A     'S','u','b','P','o','i','n','t'
#define MQPSC_FILTER_A                 'F','i','l','t','e','r'
#define MQPSC_Q_MGR_NAME_A             'Q','M','g','r','N','a','m','e'
#define MQPSC_Q_NAME_A                 'Q','N','a','m','e'
#define MQPSC_PUBLISH_TIMESTAMP_A      'P','u','b','T','i','m','e'
#define MQPSC_SEQUENCE_NUMBER_A        'S','e','q','N','u','m'
#define MQPSC_SUBSCRIPTION_NAME_A      'S','u','b','N','a','m','e'
#define MQPSC_SUBSCRIPTION_IDENTITY_A  'S','u','b','I','d','e','n','t','i','t','y'
#define MQPSC_SUBSCRIPTION_USER_DATA_A 'S','u','b','U','s','e','r','D','a','t','a'
#define MQPSC_CORREL_ID_A              'C','o','r','r','e','l','I','d'

/* XML tag names */
#define MQPSC_COMMAND_B                "<Command>"
#define MQPSC_COMMAND_E                "</Command>"
#define MQPSC_REGISTRATION_OPTION_B    "<RegOpt>"
#define MQPSC_REGISTRATION_OPTION_E    "</RegOpt>"
#define MQPSC_PUBLICATION_OPTION_B     "<PubOpt>"
#define MQPSC_PUBLICATION_OPTION_E     "</PubOpt>"
#define MQPSC_DELETE_OPTION_B          "<DelOpt>"
#define MQPSC_DELETE_OPTION_E          "</DelOpt>"
#define MQPSC_TOPIC_B                  "<Topic>"
#define MQPSC_TOPIC_E                  "</Topic>"
#define MQPSC_SUBSCRIPTION_POINT_B     "<SubPoint>"
#define MQPSC_SUBSCRIPTION_POINT_E     "</SubPoint>"
#define MQPSC_FILTER_B                 "<Filter>"
#define MQPSC_FILTER_E                 "</Filter>"
#define MQPSC_Q_MGR_NAME_B             "<QMgrName>"
#define MQPSC_Q_MGR_NAME_E             "</QMgrName>"
#define MQPSC_Q_NAME_B                 "<QName>"
#define MQPSC_Q_NAME_E                 "</QName>"
#define MQPSC_PUBLISH_TIMESTAMP_B      "<PubTime>"
#define MQPSC_PUBLISH_TIMESTAMP_E      "</PubTime>"
#define MQPSC_SEQUENCE_NUMBER_B        "<SeqNum>"
#define MQPSC_SEQUENCE_NUMBER_E        "</SeqNum>"
#define MQPSC_SUBSCRIPTION_NAME_B      "<SubName>"
#define MQPSC_SUBSCRIPTION_NAME_E      "</SubName>"
#define MQPSC_SUBSCRIPTION_IDENTITY_B  "<SubIdentity>"
#define MQPSC_SUBSCRIPTION_IDENTITY_E  "</SubIdentity>"
#define MQPSC_SUBSCRIPTION_USER_DATA_B "<SubUserData>"
#define MQPSC_SUBSCRIPTION_USER_DATA_E "</SubUserData>"
#define MQPSC_CORREL_ID_B              "<CorrelId>"
#define MQPSC_CORREL_ID_E              "</CorrelId>"

/* XML tag names as character arrays */
#define MQPSC_COMMAND_BA               '<','C','o','m','m','a','n','d','>'
#define MQPSC_COMMAND_EA               '<','/','C','o','m','m','a','n','d','>'
#define MQPSC_REGISTRATION_OPTION_BA   '<','R','e','g','O','p','t','>'
#define MQPSC_REGISTRATION_OPTION_EA   '<','/','R','e','g','O','p','t','>'
#define MQPSC_PUBLICATION_OPTION_BA    '<','P','u','b','O','p','t','>'
#define MQPSC_PUBLICATION_OPTION_EA    '<','/','P','u','b','O','p','t','>'
#define MQPSC_DELETE_OPTION_BA         '<','D','e','l','O','p','t','>'
#define MQPSC_DELETE_OPTION_EA         '<','/','D','e','l','O','p','t','>'
#define MQPSC_TOPIC_BA                 '<','T','o','p','i','c','>'
#define MQPSC_TOPIC_EA                 '<','/','T','o','p','i','c','>'
#define MQPSC_SUBSCRIPTION_POINT_BA    '<','S','u','b','P','o','i','n','t','>'
#define MQPSC_SUBSCRIPTION_POINT_EA    '<','/','S','u','b','P','o','i','n','t','>'
#define MQPSC_FILTER_BA                '<','F','i','l','t','e','r','>'
#define MQPSC_FILTER_EA                '<','/','F','i','l','t','e','r','>'
#define MQPSC_Q_MGR_NAME_BA            '<','Q','M','g','r','N','a','m','e','>'
#define MQPSC_Q_MGR_NAME_EA            '<','/','Q','M','g','r','N','a','m','e','>'
#define MQPSC_Q_NAME_BA                '<','Q','N','a','m','e','>'
#define MQPSC_Q_NAME_EA                '<','/','Q','N','a','m','e','>'
#define MQPSC_PUBLISH_TIMESTAMP_BA     '<','P','u','b','T','i','m','e','>'
#define MQPSC_PUBLISH_TIMESTAMP_EA     '<','/','P','u','b','T','i','m','e','>'
#define MQPSC_SEQUENCE_NUMBER_BA       '<','S','e','q','N','u','m','>'
#define MQPSC_SEQUENCE_NUMBER_EA       '<','/','S','e','q','N','u','m','>'
#define MQPSC_SUBSCRIPTION_NAME_BA      '<','S','u','b','N','a','m','e','>'
#define MQPSC_SUBSCRIPTION_NAME_EA      '<','/','S','u','b','N','a','m','e','>'
#define MQPSC_SUBSCRIPTION_IDENTITY_BA  '<','S','u','b','I','d','e','n','t','i','t','y','>'
#define MQPSC_SUBSCRIPTION_IDENTITY_EA  '<','/','S','u','b','I','d','e','n','t','i','t','y','>'
#define MQPSC_SUBSCRIPTION_USER_DATA_BA '<','S','u','b','U','s','e','r','D','a','t','a','>'
#define MQPSC_SUBSCRIPTION_USER_DATA_EA '<','/','S','u','b','U','s','e','r','D','a','t','a','>'
#define MQPSC_CORREL_ID_BA              '<','C','o','r','r','e','l','I','d','>'
#define MQPSC_CORREL_ID_EA              '<','/','C','o','r','r','e','l','I','d','>'

/*********************************************************************/
/*  Values for MQPSC_COMMAND Tag                                     */
/*********************************************************************/

/* Values as strings */
#define MQPSC_DELETE_PUBLICATION       "DeletePub"
#define MQPSC_DEREGISTER_SUBSCRIBER    "DeregSub"
#define MQPSC_PUBLISH                  "Publish"
#define MQPSC_REGISTER_SUBSCRIBER      "RegSub"
#define MQPSC_REQUEST_UPDATE           "ReqUpdate"

/* Values as character arrays */
#define MQPSC_DELETE_PUBLICATION_A     'D','e','l','e','t','e','P','u','b'
#define MQPSC_DEREGISTER_SUBSCRIBER_A  'D','e','r','e','g','S','u','b'
#define MQPSC_PUBLISH_A                'P','u','b','l','i','s','h'
#define MQPSC_REGISTER_SUBSCRIBER_A    'R','e','g','S','u','b'
#define MQPSC_REQUEST_UPDATE_A         'R','e','q','U','p','d','a','t','e'

/*********************************************************************/
/*  Values for following tags:                                       */
/*    MQPSC_DELETE_OPTION                                            */
/*    MQPSC_PUBLICATION_OPTION                                       */
/*    MQPSC_REGISTRATION_OPTION                                      */
/*********************************************************************/

/* Values as strings */
#define MQPSC_ADD_NAME                 "AddName"
#define MQPSC_CORREL_ID_AS_IDENTITY    "CorrelAsId"
#define MQPSC_DEREGISTER_ALL           "DeregAll"
#define MQPSC_DUPLICATES_OK            "DupsOK"
#define MQPSC_FULL_RESPONSE            "FullResp"
#define MQPSC_INFORM_IF_RETAINED       "InformIfRet"
#define MQPSC_IS_RETAINED_PUB          "IsRetainedPub"
#define MQPSC_JOIN_SHARED              "JoinShared"
#define MQPSC_JOIN_EXCLUSIVE           "JoinExcl"
#define MQPSC_LEAVE_ONLY               "LeaveOnly"
#define MQPSC_LOCAL                    "Local"
#define MQPSC_LOCKED                   "Locked"
#define MQPSC_NEW_PUBS_ONLY            "NewPubsOnly"
#define MQPSC_NO_ALTERATION            "NoAlter"
#define MQPSC_NON_PERSISTENT           "NonPers"
#define MQPSC_OTHER_SUBS_ONLY          "OtherSubsOnly"
#define MQPSC_PERSISTENT               "Pers"
#define MQPSC_PERSISTENT_AS_PUBLISH    "PersAsPub"
#define MQPSC_PERSISTENT_AS_Q          "PersAsQueue"
#define MQPSC_NONE                     "None"
#define MQPSC_PUB_ON_REQUEST_ONLY      "PubOnReqOnly"
#define MQPSC_RETAIN_PUB               "RetainPub"
#define MQPSC_VARIABLE_USER_ID         "VariableUserId"

/* Values as character arrays */
#define MQPSC_ADD_NAME_A               'A','d','d','N','a','m','e'
#define MQPSC_CORREL_ID_AS_IDENTITY_A  'C','o','r','r','e','l','A','s','I','d'
#define MQPSC_DEREGISTER_ALL_A         'D','e','r','e','g','A','l','l'
#define MQPSC_DUPLICATES_OK_A          'D','u','p','s','O','K'
#define MQPSC_FULL_RESPONSE_A          'F','u','l','l','R','e','s','p'
#define MQPSC_INFORM_IF_RETAINED_A     'I','n','f','o','r','m','I','f','R','e','t'
#define MQPSC_IS_RETAINED_PUB_A        'I','s','R','e','t','a','i','n','e','d','P','u','b'
#define MQPSC_JOIN_SHARED_A            'J','o','i','n','S','h','a','r','e','d'
#define MQPSC_JOIN_EXCLUSIVE_A         'J','o','i','n','E','x','c','l'
#define MQPSC_LEAVE_ONLY_A             'L','e','a','v','e','O','n','l','y'
#define MQPSC_LOCAL_A                  'L','o','c','a','l'
#define MQPSC_LOCKED_A                 'L','o','c','k','e','d'
#define MQPSC_NEW_PUBS_ONLY_A          'N','e','w','P','u','b','s','O','n','l','y'
#define MQPSC_NO_ALTERATION_A          'N','o','A','l','t','e','r'
#define MQPSC_NON_PERSISTENT_A         'N','o','n','P','e','r','s'
#define MQPSC_OTHER_SUBS_ONLY_A        'O','t','h','e','r','S','u','b','s','O','n','l','y'
#define MQPSC_PERSISTENT_A             'P','e','r','s'
#define MQPSC_PERSISTENT_AS_PUBLISH_A  'P','e','r','s','A','s','P','u','b'
#define MQPSC_PERSISTENT_AS_Q_A        'P','e','r','s','A','s','Q','u','e','u','e'
#define MQPSC_NONE_A                   'N','o','n','e'
#define MQPSC_PUB_ON_REQUEST_ONLY_A    'P','u','b','O','n','R','e','q','O','n','l','y'
#define MQPSC_RETAIN_PUB_A             'R','e','t','a','i','n','P','u','b'
#define MQPSC_VARIABLE_USER_ID_A       'V','a','r','i','a','b','l','e','U','s','e','r','I','d'

#endif /* MQPSC_FOLDER_VERSION */

/*********************************************************************/
/*  Publish/Subscribe Response Folder (pscr) Tags                    */
/*********************************************************************/

#ifndef MQPSCR_FOLDER_VERSION
#define MQPSCR_FOLDER_VERSION 1

/* Tag names */
#define MQPSCR_COMPLETION              "Completion"
#define MQPSCR_RESPONSE                "Response"
#define MQPSCR_REASON                  "Reason"

/* Tag names as character arrays */
#define MQPSCR_COMPLETION_A            'C','o','m','p','l','e','t','i','o','n'
#define MQPSCR_RESPONSE_A              'R','e','s','p','o','n','s','e'
#define MQPSCR_REASON_A                'R','e','a','s','o','n'

/* XML tag names */
#define MQPSCR_COMPLETION_B            "<Completion>"
#define MQPSCR_COMPLETION_E            "</Completion>"
#define MQPSCR_RESPONSE_B              "<Response>"
#define MQPSCR_RESPONSE_E              "</Response>"
#define MQPSCR_REASON_B                "<Reason>"
#define MQPSCR_REASON_E                "</Reason>"

/* XML tag names as character arrays */
#define MQPSCR_COMPLETION_BA           '<','C','o','m','p','l','e','t','i','o','n','>'
#define MQPSCR_COMPLETION_EA           '<','/','C','o','m','p','l','e','t','i','o','n','>'
#define MQPSCR_RESPONSE_BA             '<','R','e','s','p','o','n','s','e','>'
#define MQPSCR_RESPONSE_EA             '<','/','R','e','s','p','o','n','s','e','>'
#define MQPSCR_REASON_BA               '<','R','e','a','s','o','n','>'
#define MQPSCR_REASON_EA               '<','/','R','e','a','s','o','n','>'

/* Tag values */
#define MQPSCR_OK                      "ok"
#define MQPSCR_WARNING                 "warning"
#define MQPSCR_ERROR                   "error"

/* Tag values as character arrays */
#define MQPSCR_OK_A                    'o','k'
#define MQPSCR_WARNING_A               'w','a','r','n','i','n','g'
#define MQPSCR_ERROR_A                 'e','r','r','o','r'

#endif /* MQPSCR_FOLDER_VERSION */

/* New reason code values - will eventually be moved to cmqc.h */
#ifndef MQRCCF_FILTER_ERROR
  #define MQRCCF_FILTER_ERROR            3150L
#endif

#ifndef MQRCCF_WRONG_USER
  #define MQRCCF_WRONG_USER              3151L
#endif

#if defined(__cplusplus)
  }
#endif

/*********************************************************************/
/*  End of BIPRFC                                                    */
/*********************************************************************/
#endif  /* End of header file */
