import Header from "@/components/Header";
import About from "@/components/HomePageComponents/About";
import Banner from "@/components/HomePageComponents/Banner";
import CtaSection from "@/components/HomePageComponents/CtaSection";
import VideoSection from "@/components/HomePageComponents/VideoSection";



export function HomePage() {    
    return (
        <>
            <Header />
            <Banner />
            <About />
            <VideoSection />
            <CtaSection />
        </>
    )
}

