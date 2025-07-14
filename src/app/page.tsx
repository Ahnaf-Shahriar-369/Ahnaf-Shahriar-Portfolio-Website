"use client";

// import { useTranslation } from "react-i18next";

import { useEffect } from "react";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import DownBar from "./components/downBar";
import Cursor from "./components/cursor";
import "./globals.css";
import Hero from "./components/Hero";
import About from "./components/About";
// import SkillCard from "./components/SkillCard";
// import SkillCardLayout from "./components/SkillCardLayout";
// import SkillCardsLayout from "./components/SkillCardsLayout";
import ProjectCard from "./components/ProjectCard";
// import ProjectLayout from "./components/PcLayout";
import Contact from "./components/Contact";
// import NeonTicTacToe from "./components/NeonTicTacToe";
// import NeonTicTacToe from "./components/Tic";
import SkillsCarousel from "./components/SkillCarou";












// const skills = [
//   {
//     id: 1,
//     imageSrc: "/placeholder.svg?height=40&width=40",
//     name: "GitHub",
//     description: "A developer platform for storing, managing, and sharing code.",
//   },
//   {
//     id: 2,
//     imageSrc: "/placeholder.svg?height=40&width=40",
//     name: "React",
//     description: "A JavaScript library for building user interfaces with components.",
//   },
//   {
//     id: 3,
//     imageSrc: "/placeholder.svg?height=40&width=40",
//     name: "TypeScript",
//     description: "A strongly typed programming language built on JavaScript.",
//   },
//   {
//     id: 4,
//     imageSrc: "/placeholder.svg?height=40&width=40",
//     name: "Next.js",
//     description: "The React framework for production with hybrid rendering.",
//   },
//   {
//     id: 5,
//     imageSrc: "/placeholder.svg?height=40&width=40",
//     name: "Tailwind CSS",
//     description: "A utility-first CSS framework for rapid UI development.",
//   },
// ]



const demoProject = {
  id: 1,
  title: "Coming Soon",
  description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  technologies: [
    { id: 1, name: "Next.js", icon: "/logos/nextjs.svg" },
    { id: 2, name: "MongoDB", icon: "/logos/mongodb.svg" },
    { id: 3, name: "TypeScript", icon: "/logos/typescript.svg" },
    { id: 4, name: "Express", icon: "/logos/express.svg" },
    { id: 5, name: "Tailwind CSS", icon: "/logos/tailwind.svg" },
    {id: 6, name: "Node.js", icon: "/logos/nodejs.svg" }
  ],
  githubUrl: "",
  liveUrl: "",
  imageUrl: ""
}
  




export default function Home() {

// const { t } = useTranslation();




  // Fix for the right side background issue


  // if (!mounted) {
  //   return <div className="min-h-screen bg-purple-900"></div>
  // }

  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)
  // }


  
  



  useEffect(() => {
    // Ensure no overflow on the body




    document.body.style.overflow = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.width = "100%";
    document.body.style.maxWidth = "100vw";

    return () => {

      document.body.style.overflow = "";
      document.body.style.width = "";
      document.body.style.maxWidth = "";
    };
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <Sidebar />
      {/* <NeonTicTacToe /> */}
      
      
      


      <main className="min-h-screen  bg-black text-white">
        
        <section
  id="home"
  className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl p-0 m-0 "
>
  <Hero />
</section>

        <section
          id="about"
          className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
        >
          
          <About></About>

          {/* <IconCloud></IconCloud> */}
          
          {/* <AboutImg></AboutImg> */}


          {/* <Slider /> */}


        </section>






        <section
          id="skills"
          className="min-h- flex items-center justify-center transition-all duration-500 rounded-3xl"

          
        >
        

          {/* <h1 className="text-4xl font-bold">Skills Section</h1> */}

          {/* 
          <SkillCardsLayout skills={skills} /> */}

          {/* <SkillCard
  imageSrc="/github-mark.svg"
  name={t("skills.github.name")}
  description={t("skills.github.description")}
  onClick={() => console.log("GitHub card clicked")}
/> */}

      {/* <SkillCardLayout skills={skills} /> */}


          <SkillsCarousel></SkillsCarousel>
    

        </section>

        


        <section
          id="projects"
          className="min-h-screen flex items-center justify-center mb- transition-all duration-500 rounded-3xl"
        >
          {/* <h1 className="text-4xl font-bold">Projects Section</h1> */}


          {/* <ProjectLayout /> */}
          {/* <NeonTicTacToe /> */}

          <ProjectCard project={demoProject} />

          

          {/* <Contact></Contact> */}

        </section>

        <section
  id="contact"
  className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
>
          {/* <h1 className="text-4xl font-bold">Contact Section</h1> */}
          <Contact></Contact>
        </section>
      </main> 
      <DownBar />
      
    </>
  );
}