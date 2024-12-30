/*
 * @Description: 主页面
 * @Author: caoyalan
 * @Email: 2056246231@qq.com
 * @LastEditTime: 2024-12-30 16:11:58
 * @FilePath: \my-app\src\app\page.tsx
 */
"use client";
import { useState, useEffect } from "react";

interface Prize {
  name: string;
  count: number;
  numbers: number[];
}

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string>("");
  const [number, setNumber] = useState<number | null>(null);
  const [prizePool, setPrizePool] = useState<Prize[]>([]);
  const [remainingNumbers, setRemainingNumbers] = useState<number[]>([]);

  // 初始化奖池和号码池
  useEffect(() => {
    const prizes: Prize[] = [
      { name: "特等奖", count: 1, numbers: [] },
      { name: "一等奖", count: 1, numbers: [] },
      { name: "二等奖", count: 2, numbers: [] },
      { name: "三等奖", count: 3, numbers: [] },
      { name: "幸运奖", count: 10, numbers: [] },
    ];

    // 生成0-80的数组
    const numbers = Array.from({ length: 81 }, (_, i) => i);

    // 随机分配号码给各个奖项
    prizes.forEach((prize) => {
      for (let i = 0; i < prize.count; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        prize.numbers.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1);
      }
    });

    setPrizePool(prizes);
    setRemainingNumbers(numbers);
  }, []);

  // 格式化数字显示
  const formatNumber = (num: number | null): string => {
    if (num === null) return "0000";
    return num.toString().padStart(4, "0");
  };

  const handleLottery = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult("");

    // 数字滚动效果
    let count = 0;
    const rollInterval = setInterval(() => {
      setNumber(Math.floor(Math.random() * 81));
      count++;

      // 当滚动50次后停止
      if (count > 50) {
        clearInterval(rollInterval);

        // 最终抽奖结果
        const finalNumber = Math.floor(Math.random() * 81);
        setNumber(finalNumber);
        setIsSpinning(false);
      }
    }, 40); // 每40毫秒变化一次数字
  };

  return (
    <div className="bg">
      <div className="flex content">
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          {/* 抽奖转盘部分 */}
          {/* <div
            className={`w-64 h-64 border-4 rounded-full flex flex-col items-center justify-center mb-8
                        ${isSpinning ? "animate-spin" : ""}`}
          ></div> */}
          <span className="text-4xl font-bold mb-2">
            {formatNumber(number) !== null ? formatNumber(number) : "?"}
          </span>
          <button
            onClick={handleLottery}
            disabled={isSpinning}
            className={`px-6 py-3 rounded-lg text-white font-bold
                     ${
                       isSpinning
                         ? "bg-gray-400 cursor-not-allowed"
                         : "bg-blue-500 hover:bg-blue-600"
                     }`}
          >
            {isSpinning ? "抽奖中..." : "开始抽奖"}
          </button>
        </div>
      </div>
    </div>
  );
}
