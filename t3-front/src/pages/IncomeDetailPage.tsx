import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import CategoryDonutChart from "../components/charts/CategoryDonutChart";
import { formatCurrency } from "../utils/";

const IncomeDetailPage = () => {
    const navigate = useNavigate();

    // 🔥 더미 데이터 (서버 연결 후 교체)
    const totalIncomeAmount = 600000;

    const categoryStats = {
        values: [350000, 90000, 45000, 30000],
        colors: ["#FFA559", "#FFE16C", "#8FD694", "#6DD3FF"],
        list: [
            { label: "식비", amount: 135000, percent: 25, color: "#FFA559" },
            { label: "약속", amount: 90000, percent: 20, color: "#FFE16C" },
            { label: "놀거리", amount: 45000, percent: 15, color: "#8FD694" },
            { label: "교통비", amount: 30000, percent: 10, color: "#6DD3FF" },
        ],
    };

    const dailyHistory = [
        {
            date: "10월 20일",
            list: [
                { name: "디저트월드", category: "식비", amount: 10000 },
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
        <div className="p-4 flex flex-col gap-4 bg-app-bg">

            {/* Header */}
            <div className="flex items-center justify-between">
                <button className="text-2xl" onClick={() => navigate(-1)}>
                    &lt;
                </button>

                <p className="text-lg font-semibold">2025년 10월 수입</p>

                <div className="w-5"></div>
            </div>

            {/* 총 수입 */}
            <p className="text-text-green text-2xl font-bold">
                +{formatCurrency(totalIncomeAmount)}원
            </p>

            {/* 도넛 차트 + 리스트 */}
            <Card className="p-6 flex flex-col gap-5">

                {/* 상단 텍스트 */}
                <div className="flex justify-between items-center">
                    <p className="text-text-gray text-sm">이번달 분야별 수입 통계</p>
                    <p className="text-text-gray text-sm">
                        총 {formatCurrency(totalIncomeAmount)}원
                    </p>
                </div>

                {/* 도넛 차트 */}
                <div className="flex justify-center">
                    <CategoryDonutChart
                        data={categoryStats.values}
                        colors={categoryStats.colors}
                        centerText={formatCurrency(totalIncomeAmount)}
                    />
                </div>

                {/* 카테고리 리스트 */}
                <div className="flex flex-col gap-3 mt-4">
                    {categoryStats.list.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                ></span>
                                <span className="text-text-primary">
                                    {item.label} ({item.percent}%)
                                </span>
                            </div>

                            <span className="text-primary-red">
                                -{formatCurrency(item.amount)}원
                            </span>
                        </div>
                    ))}
                </div>

            </Card>

            {/* 날짜별 내역 */}
            {dailyHistory.map((day, idx) => (
                <Card key={idx} className="p-4 flex flex-col gap-3">

                    <p className="text-text-gray text-sm font-semibold">{day.date}</p>

                    {day.list.map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-xs text-text-gray">{item.category}</span>
                            </div>

                            <span
                                className={
                                    item.amount > 0
                                        ? "text-text-green font-semibold"
                                        : "text-primary-red font-semibold"
                                }
                            >
                                {item.amount > 0 ? "+" : ""}
                                {formatCurrency(item.amount)}원
                            </span>
                        </div>
                    ))}

                </Card>
            ))}

        </div>
    );
};

export default IncomeDetailPage;
