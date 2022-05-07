const Recommend = async (req, res) => {
  // 해당 uid와 diaryDate에 해당되는 diary가 존재하는지 확인 & isMusic 확인 -> false여야 함.
  // diaryEmotion 과 userEmotion 가져오고
  // 코사인 유사도 검사해서 topEmotion에서 유사도 높은거 3개 추천: recommend
  // 그리고 topEmotion이 아닌 다른 장르에서 유사도 낮은거 2개 추천: additionalRecommend
};

module.exports = {
  Recommend,
};
