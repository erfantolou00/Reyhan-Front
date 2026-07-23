import React from 'react';
import { FaUsers, FaMoneyBillWave, FaChartLine, FaCog, FaWarehouse, FaFileContract, FaLightbulb } from "react-icons/fa";
import { FiFile, FiLock, FiSearch, FiLayers } from "react-icons/fi";

// تعریف دیکشنری تطابق رشته به کامپوننت آیکون
const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  FaUsers: FaUsers,
  FaMoneyBillWave: FaMoneyBillWave,
  FaChartLine: FaChartLine,
  FaCog: FaCog,
  FaWarehouse: FaWarehouse,
  FaFileContract: FaFileContract,
  FaLightbulb: FaLightbulb,
  FiFile: FiFile,
  FiLock: FiLock,
  FiSearch: FiSearch,
  FiLayers: FiLayers,
};

// تابع کمکی برای رندر آیکون از روی کلید متنی
export function renderIcon(iconKey: string, className = "w-6 h-6") {
  const IconComponent = iconComponents[iconKey];
  if (!IconComponent) return null; // بازگرداندن پیش‌فرض یا خالی در صورت عدم وجود کلید
  return <IconComponent className={className} />;
}
