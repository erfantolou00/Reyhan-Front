import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/40 to-white py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                درباره ریحان
              </h1>
              <p className="text-xl text-gray-600">
                ما در سال ۱۴۰۳ با هدف ارائه راهکارهای نوین مدیریتی تاسیس شدیم
              </p>
            </div>
          </div>
        </section>

        {/* Company Info Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">📖 داستان ما</h2>
                <p className="text-gray-600 mb-4">
                  ریحان با هدف ارائه راهکارهای نوین در زمینه مدیریت سازمانی و با تکیه بر تجربه تیم متخصص خود،
                  نرم‌افزار ERP جامعی را طراحی و پیاده‌سازی کرده است که پاسخگوی نیازهای متنوع سازمان‌ها و شرکت‌ها
                  در ابعاد مختلف است.
                </p>
                <p className="text-gray-600">
                  ما معتقدیم که هر سازمانی نیازهای منحصر به فرد خود را دارد و به همین دلیل،
                  محصولات ما کاملاً قابل سفارشی‌سازی هستند تا بتوانند به بهترین شکل ممکن
                  با نیازهای مشتریان ما هماهنگ شوند.
                </p>
              </div>
              <div className="bg-gray-200 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">📝 اطلاعات شرکت</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="font-semibold">تاریخ تاسیس:</span>
                    <span className="mr-2">۱۴۰۳</span>
                  </li>
                  <li>
                    <span className="font-semibold">موقعیت:</span>
                    <span className="mr-2">پارک علم و فناوری دانشگاه سمنان</span>
                  </li>
                  <li>
                    <span className="font-semibold">تعداد کارکنان:</span>
                    <span className="mr-2">۵-۶ نفر</span>
                  </li>
                  <li>
                    <span className="font-semibold">حوزه فعالیت:</span>
                    <span className="mr-2">توسعه نرم‌افزارهای مدیریتی</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">👥 تیم ما</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  role: 'مدیر عامل',
                  description: 'مدیریت استراتژیک و توسعه کسب و کار',
                  image: '/images/team/1.png',
                },
                {
                  role: 'مدیر فنی',
                  description: 'مدیریت تیم توسعه و کیفیت محصول',
                  image: '/images/team/2.png',
                },
                {
                  role: 'مدیر محصول',
                  description: 'تحلیل نیازمندی‌ها و مدیریت محصول',
                  image: '/images/team/3.png',
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                    <Image src={member.image} alt="Team Member" width={400} height={400} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.role}</h3>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 