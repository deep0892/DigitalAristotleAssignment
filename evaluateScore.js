//Section Group Mapping to determine section of a group in constant time
let sectionGroupMapping = {
  G1: "S1",
  G2: "S1",
  G3: "S1",
  G4: "S2",
  G5: "S2"
};
//Number of group to be taken in each section
let sectionAttemptsMaster = {
  S1: 2,
  S2: 2
};
//Question Group Mapping to determine group of a question in constant time.
let groupQuestionMaping = {
  Q1: "G1",
  Q2: "G1",
  Q3: "G2",
  Q4: "G2",
  Q5: "G3",
  Q6: "G3",
  Q7: "G4",
  Q8: "G4",
  Q9: "G4",
  Q10: "G5",
  Q11: "G5",
  Q12: "G5",
  Q13: "G5",
  Q14: "G5"
};
//Number of question to be taken in each group
let groupAttemptsMaster = {
  G1: 2,
  G2: 2,
  G3: 2,
  G4: 3,
  G5: 3
};
let QuestionMaster = {
  Q1: 5,
  Q2: 5,
  Q3: 4,
  Q4: 6,
  Q5: 7,
  Q6: 3,
  Q7: 10,
  Q8: 10,
  Q9: 10,
  Q10: 10,
  Q11: 10,
  Q12: 10,
  Q13: 10,
  Q14: 10
};
let studentMarksScheme = {
  Q1: 3,
  Q2: 5,
  Q3: 2,
  Q4: 4,
  Q5: 2,
  Q6: 3,
  Q7: 10,
  Q8: 10,
  Q9: 10,
  Q10: 10,
  Q11: 10,
  Q12: 10,
  Q13: 10,
  Q14: 10
};
let studentKeys = Object.keys(studentMarksScheme);
let totalScore = 0;

let groupMin = {};
let obj = {};

for (let i = 0; i < studentKeys.length; i++) {
  let currentGroup = groupQuestionMaping[studentKeys[i]];
  let groupAttempts = groupAttemptsMaster[currentGroup];
  let groupMinimum = groupMin[currentGroup];
  let Group = obj[currentGroup];
  if (!Group) {
    obj[currentGroup] = [studentMarksScheme[studentKeys[i]]];
    groupMin[currentGroup] = studentMarksScheme[studentKeys[i]];
  } else if (Group.length < groupAttempts) {
    Group.push(studentMarksScheme[studentKeys[i]]);
    obj[currentGroup] = Group;
    if (groupMin < studentMarksScheme[studentKeys[i]]) {
      groupMin[currentGroup] = studentMarksScheme[studentKeys[i]];
    }
  } else if (groupMinimum < studentMarksScheme[studentKeys[i]]) {
    let min = 0;
    let newArr = Group.filter(item => {
      return item != groupMinimum;
    });
    newArr.push(studentMarksScheme[studentKeys[i]]);
    obj[currentGroup] = newArr;
    groupMinimum = newArr[0];
    for (let i = 1; i < newArr.length; i++) {
      if (groupMinimum < newArr[i]) {
        groupMinimum = newArr[i];
      }
    }
    groupMin[currentGroup] = groupMinimum;
  }
}
let keys = Object.keys(obj);
let section = {};
for (let i = 0; i < keys.length; i++) {
  let currentSection = sectionGroupMapping[keys[i]];
  let sec = section[currentSection];
  let arr = obj[keys[i]];
  let sum = arr.reduce((x, y) => {
    return x + y;
  });
  if (!sec) {
    section[currentSection] = [sum];
    secMin = sum;
  } else {
    sec.push(sum);
    section[currentSection] = sec;
  }
}
let sectionKeys = Object.keys(section);
for (let j = 0; j < sectionKeys.length; j++) {
  let arr = section[sectionKeys[j]];
  let sectionAttempts = sectionAttemptsMaster[sectionKeys[j]];
  let sortedSectionMarks = arr.sort((x, y) => {
    return x < y;
  });
  let acceptedSectionMarks = sortedSectionMarks.slice(0, sectionAttempts);
  let sum = acceptedSectionMarks.reduce((x, y) => {
    return x + y;
  });
  totalScore += sum;
}
console.log("obj", obj);
console.log("section", section);
console.log("totalScore", totalScore);
