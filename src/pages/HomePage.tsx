import About from "@/components/HomePageComponents/About";
import Banner from "@/components/HomePageComponents/Banner";
import CtaSection from "@/components/HomePageComponents/CtaSection";
import VideoSection from "@/components/HomePageComponents/VideoSection";



export function HomePage() {    
    return (
        <>
            <Banner />
            <About />
            <VideoSection />
            <CtaSection />
        </>
    )
}

