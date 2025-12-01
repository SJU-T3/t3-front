import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import ProgressCircle from "../components/charts/ProgressCircle";
import { IMAGES } from "../constants";
import { formatCurrency } from "../utils/";

const CategoryDetailPage = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();

    const totalAmount = 135000;
    const percent = 25;
    const totalCount = 12;
    const totalCountPercent = 56;

    const dailyHistory = [
        {
            date: "10월 20일",
            list: [
                { name: "디저트월드", category: "식비", amount: -10000 },
                { name: "오커스토리", category: "식비", amount: -13000 },
            ],
        },
        {
            date: "10월 15일",
            list: [
                { name: "돈까스정원", category: "식비", amount: -15000 },
                { name: "친구커피", category: "식비", amount: -26000 },
            ],
        },
    ];

    return (
        <div className="p-4 flex flex-col gap-4 bg-app-bg pb-6">

            {/* Header */}
            <div className="relative flex items-center py-2 mb-2">
                <button className="text-2xl absolute left-0" onClick={() => navigate(-1)}>
                    &lt;
                </button>
                <p className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">
                    세부내역
                </p>
            </div>

            {/* 카테고리명 */}
            <p className="text-text-gray text-sm">{categoryName}</p>

            {/* 총 금액 */}
            <p className="text-primary-green text-3xl font-bold">
                {formatCurrency(totalAmount)}원
            </p>

            {/* --- 🔥 1번째 카드 : 분석 텍스트 & 개구리 --- */}
            <Card className="p-5 flex justify-between items-start">
                <div>
                    <p className="text-text-gray text-sm">
                        데이터의 <span className="text-primary-green font-semibold">{categoryName}</span> 소비 분석
                    </p>

                    <p className="text-text-primary text-sm leading-[1.3] mt-2">
                        야식으로 지출을 너무 자주 먹네요. <br />
                        야식을 3번 줄여봐요!
                    </p>
                </div>

                <img
                    src={IMAGES.MASCOT.HALF.DAY}
                    className="
                    absolute
                    right-8
                    w-[125px]
                    h-[125px]
                    object-contain
                    translate-y-[-9px]     /* 살짝 아래로 내려서 자연스럽게 */
                    "
                    alt="frog mascot"
                />
            </Card>

            {/* --- 🔥 2번째 & 3번째 카드 : 반원차트 + 전체 개수 --- */}
            <div className="grid grid-cols-2 gap-3">

                {/* 반원차트 */}
                <Card className="flex flex-col items-center justify-center py-5">
                    <p className="text-text-gray text-xs mb-2">
                        전체 지출 10번 중 비율
                    </p>

                    {/* 글씨 크기 줄이기 */}
                    <ProgressCircle current={percent} goal={100} mode="percent" />
                </Card>

                {/* 전체 소비 개수 */}
                <Card className="flex flex-col items-center justify-center py-5">
                    <p className="text-text-gray text-xs">이번달 전체 소비 개수</p>

                    <p className="text-primary-green text-2xl font-bold mt-1">
                        총 {totalCount}개
                    </p>

                    <p className="text-text-gray text-sm mt-1">
                        {totalCountPercent}%
                    </p>
                </Card>
            </div>

            {/* --- 🔥 날짜별 내역 카드들 --- */}
            {dailyHistory.map((day, idx) => (
                <Card key={idx} className="p-4 flex flex-col gap-3">
                    <p className="text-text-gray text-sm font-semibold">{day.date}</p>

                    {day.list.map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-xs text-text-gray">{item.category}</span>
                            </div>

                            <span className="text-primary-red font-semibold">
                                {formatCurrency(item.amount)}원
                            </span>
                        </div>
                    ))}
                </Card>
            ))}
        </div>
    );
};

export default CategoryDetailPage;
