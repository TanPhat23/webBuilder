import ProfileCard from "@/components/about/ProfileCard";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Zap, Globe, Star } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Phan Tấn Phát",
      role: "Co-Founder & FullStack Engineer",
      description: "Phan Tấn Phát có niềm đam mê với công nghệ web và luôn tìm cách tối ưu hóa trải nghiệm người dùng.",
      imageUrl: "/deWeb.jpg",
      featured: true,
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com/TanPhat23",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Võ Chí Thông",
      role: "Co-Founder & UI/UX Designer",
      description: "Võ Chí Thông tập trung vào thiết kế giao diện trực quan, giúp DeWeb trở thành nền tảng dễ sử dụng cho mọi người.",
      imageUrl: "/deWeb2.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com/STNx99",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Chương Tử Luân",
      role: "Co-Founder & Frontend Developer",
      description: "Chương Tử Luân đảm bảo DeWeb có giao diện vận hành mượt mà, hiệu quả và dễ nhìn cho người dùng.",
      imageUrl: "/deWeb1.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com/Ben2811",
        twitter: "https://twitter.com",
      },
    },
  ];

  const coreValues = [
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Lấy người dùng làm trọng tâm",
      description: "Mọi tính năng của DeWeb đều được thiết kế dựa trên nhu cầu thực tế của người dùng."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Đơn giản & Hiệu quả",
      description: "Chúng tôi tin rằng công cụ tốt nhất là công cụ đơn giản nhưng mạnh mẽ."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Sáng tạo không giới hạn",
      description: "DeWeb trao quyền cho người dùng tự do sáng tạo mà không bị giới hạn bởi kỹ thuật."
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-green-500" />,
      title: "Chất lượng cao",
      description: "Chúng tôi không chấp nhận sự trung bình, mọi tính năng đều phải đạt tiêu chuẩn cao nhất."
    },
  ];

  const testimonials = [
    {
      content: "DeWeb đã giúp chúng tôi tiết kiệm hàng trăm giờ phát triển giao diện. Thật sự là một công cụ tuyệt vời!",
      author: "Ngô Đăng Khoa",
      role: "Team 14, 22DTHC4"
    },
    {
      content: "Với DeWeb, tôi có thể tạo ra các trang web đẹp mắt mà không cần phải viết nhiều code. Hoàn toàn đổi mới cách làm việc của tôi.",
      author: "Trần Nhật Phi",
      role: "Freelance Developer"
    },
  ];

  return (
    <>
      <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        <Container className="py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Về <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DeWeb</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              DeWeb giúp bạn xây dựng giao diện web một cách đơn giản, nhanh chóng và hiệu quả. Chúng tôi tạo ra công cụ hỗ trợ lập trình viên ở mọi cấp độ.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="rounded-full font-extrabold bg-white text-purple-900 hover:bg-blue-100" asChild>
                <Link href="/sign-in">Bắt đầu ngay</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-black border-white hover:bg-white/10" asChild>
                <Link href="/pricing">Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-24 space-y-24">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 font-medium mb-2">
              Sứ mệnh của chúng tôi
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Biến <span className="text-blue-600">ý tưởng</span> thành <span className="text-purple-600">hiện thực</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              DeWeb ra đời với mục tiêu giúp mọi người dễ dàng tiếp cận và xây dựng giao diện web chuyên nghiệp, mà không cần kiến thức lập trình phức tạp.
            </p>
            <ul className="space-y-2">
              {[
                "Tạo ra website dễ dàng với drag & drop",
                "Tùy chỉnh mọi phần của trang web",
                "Tối ưu trải nghiệm người dùng",
                "Xuất code sạch và tối ưu"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl order-1 md:order-2 transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Đội ngũ DeWeb đang làm việc"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800 font-medium">
              Giá trị cốt lõi
            </div>
            <h2 className="text-3xl font-bold">Những định hướng phát triển của chúng tôi</h2>
            <p className="text-lg text-muted-foreground">
              Tại DeWeb, chúng tôi tuân theo những giá trị cốt lõi để đảm bảo sản phẩm của chúng tôi luôn đáp ứng được nhu cầu của người dùng.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 font-medium mb-2">
              Đội ngũ
            </div>
            <h2 className="text-3xl font-bold mb-4">Gặp gỡ những người sáng lập DeWeb</h2>
            <p className="text-lg text-muted-foreground">
              Chúng tôi là những người đam mê công nghệ và thiết kế, cùng nhau xây dựng DeWeb với mục tiêu tạo ra công cụ tốt nhất cho cộng đồng.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <ProfileCard key={index} {...member} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 -mx-4 px-4 py-16 rounded-3xl">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <div className="inline-block rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-800 font-medium mb-2">
                Phản hồi từ khách hàng
              </div>
              <h2 className="text-3xl font-bold">Những người đã sử dụng DeWeb nói gì?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative">
                  <Star className="absolute top-4 right-4 h-5 w-5 text-yellow-400" />
                  <p className="text-lg italic mb-6">{item.content}</p>
                  <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center max-w-3xl mx-auto bg-gradient-to-r from-purple-100 to-blue-100 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng để bắt đầu với DeWeb?</h2>
          <p className="text-lg mb-8 text-gray-700">
            Hãy tham gia cùng hàng ngàn người dùng đang xây dựng web một cách dễ dàng với công cụ của chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/sign-in">Dùng thử miễn phí</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Đặt lịch demo
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
