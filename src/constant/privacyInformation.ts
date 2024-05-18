const privacyInformation = {
  studentId: "학번",
  gender: "성별",
  major: "전공",
  department: "학부",
};

const map = new Map();

for (const [key, value] of Object.entries(privacyInformation)) {
  map.set(key, value);
}

export default map;
