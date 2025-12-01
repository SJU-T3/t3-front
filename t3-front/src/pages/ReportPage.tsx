import { useState } from "react";
import Card from "../components/common/Card";
import ProgressBar from "../components/charts/ProgressBar";
import CategoryDonutChart from "../components/charts/CategoryDonutChart";

import { IMAGES } from "../constants";
import { formatCurrency } from "../utils/";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const [showDetail, setShowDetail] = useState(false);

  // -----------------------------
  // 🔥 더미 데이터
  // -----------------------------
  const goal = {
    targetCount: 3,
    currentCount: 2,
    goalName: "배달음식 5번 미만",
  };

  const totalIncomeAmount = 600000;
  const totalExpenseAmount = 350000;
  const totalGoalAmount = 200000;

  const totalExpenseCount = 37;
  const impulseCount = 7;
  const plannedCount = 30;

  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(10);

  const navigate = useNavigate();


  const categoryStats = {
    values: [135000, 90000, 45000, 30000],
    colors: ["#FF9F5B", "#FFD86E", "#7BDDA1", "#6DD3FF"],
    list: [
      { label: "식비", amount: 135000, percent: 25 },
      { label: "약속", amount: 90000, percent: 20 },
      { label: "놀거리", amount: 45000, percent: 15 },
      { label: "교통비", amount: 30000, percent: 10 },
    ].map((item, i) => ({ ...item, color: ["#FF9F5B", "#FFD86E", "#7BDDA1", "#6DD3FF"][i] })),
  };
  const goPrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const goNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };


  return (
    <div className="p-4 flex flex-col gap-4 bg-app-bg">

      {/* 월 이동 */}
      <div className="w-full flex items-center justify-between px-2 py-3">
        <button
          onClick={goPrevMonth}
          className="text-[20px] text-text-gray font-light"
        >
          &lt;
        </button>

        <p className="text-text-gray font-semibold text-lg">
          {year}년 {month}월
        </p>

        <button
          onClick={goNextMonth}
          className="text-[20px] text-text-gray font-light"
        >
          &gt;
        </button>
      </div>
      {/* ----------------------- */}
      {/* 이번달 요약 (좌/우 두 카드) */}
      {/* ----------------------- */}

      <div className="flex gap-3 items-stretch">
        {/* 왼쪽: 요약 카드 */}
        <Card className="flex-1 p-5 flex flex-col gap-2">

          <div className="flex justify-between items-start">
            <p className="text-text-gray text-xs">이번달 요약</p>

            {/* 자세히 보기 버튼 */}
            <button
              onClick={() => setShowDetail((prev) => !prev)}
              className="text-xs text-text-gray"
            >
              {showDetail ? "접기 ▲" : "자세히 보기 ▼"}
            </button>
          </div>

          <p className="text-text-primary font-semibold text-[14px] mt-1">
            목표 {goal.currentCount}개 중 {goal.targetCount}개 달성했어요!
          </p>

          {/* 자세히 보기 영역 */}
          {showDetail && (
            <p className="text-text-gray text-[13px] mt-1 leading-[1.3]">
              저번달에 비해 약속을 덜 나갔어요! <br />
              하지만 야식이 저번 달에 비해 2번 늘어서 목표 예산을 넘어갔어요.
            </p>
          )}
        </Card>

        {/* 오른쪽: 마스코트 카드 (작은 카드) */}
        <Card className="w-[110px] flex items-center justify-center p-3">
          <img
            src={IMAGES.MASCOT.ACTIVE.DAY}
            className={`w-[4.5rem] transition-all duration-300 ${showDetail ? "h-[7rem]" : "h-[4.5rem]"
              }`}
            alt="mascot"
          />
        </Card>
      </div>


      {/* ----------------------- */}
      {/* 이번달 목표 + 예산 (2개의 카드, 가로 배치) */}
      {/* ----------------------- */}
      <div className="flex gap-3">

        {/* 왼쪽: 이번달 목표 */}
        <Card className="flex-1 p-5 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-text-gray text-sm">이번달 목표</p>
            <span className="text-xs bg-[#D7F7C6] text-green-700 px-2 py-1 rounded-md">
              달성
            </span>
          </div>

          <p className="text-text-primary text-lg font-semibold">
            {goal.goalName}
          </p>

          <p className="text-text-gray text-sm">
            총 {goal.currentCount}번, 목표를 달성했어요!
          </p>
        </Card>

        {/* 오른쪽: 이번달 예산 */}
        <Card className="flex-1 p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-between">
            <p className="text-text-gray text-sm">이번달 예산</p>

            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
              미달성
            </span>
          </div>

          <div>
            <p className="text-text-gray text-xs">이번달 총 소비</p>
            <p className="text-primary-red text-xl font-bold">
              -{formatCurrency(totalExpenseAmount)}원
            </p>
          </div>

          <div>
            <p className="text-text-gray text-xs">이번달 총 소비 목표 비용</p>
            <p className="text-text-primary text-lg font-semibold">
              {formatCurrency(totalGoalAmount)}원
            </p>
          </div>
        </Card>

      </div>
      {/* ----------------------- */}
      {/* 계획 / 즉흥 소비 */}
      {/* ----------------------- */}
      <Card className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-text-gray text-sm">이번달 계획소비 개수</p>
          <p className="text-text-gray text-sm">총 {totalExpenseCount}개</p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={IMAGES.MASCOT.SINGLE.NOT}
            className="w-[3rem] h-[3rem]"
          />
          <ProgressBar
            label="즉흥"
            value={impulseCount}
            total={totalExpenseCount}
            variant="red"
          />
        </div>

        {/* 계획 소비 */}
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.MASCOT.SINGLE.DAY}
            className="w-[3rem] h-[3rem]"
          />
          <ProgressBar
            label="계획"
            value={plannedCount}
            total={totalExpenseCount}
            variant="green"
          />
        </div>
      </Card>

      {/* ----------------------- */}
      {/* 이번달 총 수입 */}
      {/* ----------------------- */}
      <Card
        className="flex flex-row items-center justify-between px-6 py-4 cursor-pointer"
        onClick={() => navigate("/income")}
      >
        {/* 왼쪽: 제목 + 금액을 한 줄로 */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-text-gray text-sm">이번달 총 수입</span>
          <span className="text-text-green font-bold text-base">
            +{formatCurrency(totalIncomeAmount)}원
          </span>
        </div>

        {/* 오른쪽 > */}
        <span className="text-text-gray text-xl flex-shrink-0">&gt;</span>
      </Card>


      {/* ----------------------- */}
      {/* 카테고리 도넛 차트 */}
      {/* ----------------------- */}
      <Card className="p-6 flex flex-col gap-6">
        <div className="flex justify-between">
          <p className="text-text-gray text-sm">이번달 분야별 지출 통계</p>
          <p className="text-text-gray text-sm">
            총 {formatCurrency(totalExpenseAmount)}원
          </p>
        </div>

        <div className="flex justify-center">
          <CategoryDonutChart
            data={categoryStats.values}
            colors={categoryStats.colors}
            centerText={formatCurrency(totalExpenseAmount)}
          />
        </div>

        <div className="flex flex-col gap-2">
          {categoryStats.list.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm cursor-pointer"
              onClick={() => navigate(`/report/category/${item.label}`)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>

                <span className="text-text-primary">
                  {item.label} ({item.percent}%)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-primary-red">
                  -{formatCurrency(item.amount)}원
                </span>

                {/* ➜ 오른쪽 화살표 */}
                <span className="text-text-gray text-lg">&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </Card >
    </div >
  );
};

export default ReportPage;
