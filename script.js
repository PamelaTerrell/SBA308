// MY WORK STARTS AT LINE 82
// LINE 1 - 80 IS THE SANDBOX COPY AND PASTE STUFF

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// Simplified function to calculate the score percentage
const calculateScore = (submission, assignment) => {
  let score = submission.score;
  if (new Date(submission.submitted_at) > new Date(assignment.due_at)) {
    score -= assignment.points_possible * 0.1; // Deduct 10% for late submissions
  }
  return (score / assignment.points_possible) * 100;
};

// Main function to process learner data
const getLearnerData = (courseInfo, assignmentGroup, learnerSubmissions) => {
  if (assignmentGroup.course_id !== courseInfo.id) throw new Error("Invalid course ID");

  const result = {
    id: learnerSubmissions[0]?.learner_id || null,
    avg: 0
  };

  let totalPoints = 0, totalWeightedScore = 0;

  assignmentGroup.assignments.forEach(assignment => {
    const submission = learnerSubmissions.find(sub => sub.assignment_id === assignment.id);
    if (!submission || new Date(assignment.due_at) > new Date()) return;

    const scorePercentage = calculateScore(submission.submission, assignment);
    result[assignment.id] = scorePercentage;

    totalPoints += assignment.points_possible;
    totalWeightedScore += (scorePercentage / 100) * assignment.points_possible;
  });

  result.avg = (totalWeightedScore / totalPoints) * 100;
  return [result];
};

// Run the function
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
