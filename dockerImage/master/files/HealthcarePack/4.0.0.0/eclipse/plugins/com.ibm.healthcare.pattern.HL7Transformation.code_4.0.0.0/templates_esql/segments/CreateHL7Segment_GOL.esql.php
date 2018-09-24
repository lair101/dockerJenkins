<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_GOL (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'GOL';
		SET OutRef.ns:"GOL.1.ActionCode" = AssignValue;
		SET OutRef.ns:"GOL.2.ActionDateTime" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.3.GoalID".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.4.GoalInstanceID".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"GOL.4.GoalInstanceID".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"GOL.4.GoalInstanceID".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"GOL.4.GoalInstanceID".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"GOL.5.EpisodeofCareID".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"GOL.5.EpisodeofCareID".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"GOL.5.EpisodeofCareID".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"GOL.5.EpisodeofCareID".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"GOL.6.GoalListPriority" = AssignValue;
		SET OutRef.ns:"GOL.7.GoalEstablishedDateTime" = AssignValue;
		SET OutRef.ns:"GOL.8.ExpectedGoalAchieveDateTime" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.9.GoalClassification".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.10.GoalManagementDiscipline".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.11.CurrentGoalReviewStatus".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.12.CurrentGoalReviewDateTime" = AssignValue;
		SET OutRef.ns:"GOL.13.NextGoalReviewDateTime" = AssignValue;
		SET OutRef.ns:"GOL.14.PreviousGoalReviewDateTime" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.1" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.1".ns:"CQ.2".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.1".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.2".ns:"RI.2" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.3" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.4".ns:"TS.1" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.4".ns:"TS.2" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.5".ns:"TS.1" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.5".ns:"TS.2" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.6" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.7" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.8" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.9" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.1" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.2" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.3" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.4" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.5" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.6" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.7" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.8" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.9" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.10" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.10".ns:"OSD.11" = AssignValue;
		SET OutRef.ns:"GOL.15.GoalReviewInterval".ns:"TQ.12" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.16.GoalEvaluation".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.17.GoalEvaluationComment" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.18.GoalLifeCycleStatus".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.19.GoalLifeCycleStatusDateTime" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.20.GoalTargetType".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.1".ns:"FN.1" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.1".ns:"FN.2" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.1".ns:"FN.3" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.1".ns:"FN.4" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.1".ns:"FN.5" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.2" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.3" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.4" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.5" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.6" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.7" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.8" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.10".ns:"DR.1" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.10".ns:"DR.2" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.11" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.12" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.13" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.14" = AssignValue;
		SET OutRef.ns:"GOL.21.GoalTargetName".ns:"XPN.15" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.1" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.2" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.3" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.4" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.5" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.6" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.7" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.8" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.9" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.10" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.11" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.12" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.13" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.14" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.15" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.16" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.17" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.18" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.19" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.20" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.21" = AssignValue;
		SET OutRef.ns:"GOL.22.MoodCode".ns:"CNE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>