import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { getSettings } from '../firebase/services/settingsService'
import { projects } from '../data/projects'
import houseRender from '../assets/transparentbackgroundhouse.png'
import React, { useState, useEffect } from 'react'

const DEFAULT_HERO = "https://lh3.googleusercontent.com/aida-public/AB6AXuDar4SRBvcnU0_eViIb5fyO6-f6Zg02ySzjPtWTMwm8iYT0H9OjezC7W7-tjQCRve3hTgB6-XpE_4xTAZx4K8djySAxk3G_I2ix6WIMR4c6xnP6bF2NDOtiisni9DCp8PyZsIwCIvNlcg95p7mcSX1XhdeRETG7NrwBx_en3kVoK7FHbmV9qyFSDYBRFRkVUJbVw8K2EMkUp8P6tfogfU3vTyQPAh1udNBEljnTmRqNRbT8uxw2LFelO0HSQcOXa6ITNvRSabgf7l9l";

export default function Home() {
  const customEase = [0.16, 1, 0.3, 1]
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO)
  const [featuredImage, setFeaturedImage] = useState(projects[0].image)
  const [introImage, setIntroImage] = useState(houseRender)

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings()
      if (settings.homeHero) setHeroImage(settings.homeHero)
      if (settings.homeFeaturedImage) setFeaturedImage(settings.homeFeaturedImage)
      if (settings.homeIntroImage) setIntroImage(settings.homeIntroImage)
    }
    loadSettings()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: customEase }
    }
  }

  return (
    <main className="relative overflow-hidden">
      <Helmet>
        <title>Home | Jadhav Architects Architecture</title>
        <meta name="description" content="Jadhav Architects Architecture - Bespoke architectural escapes where modern geometry meets the untamed flow of nature." />
      </Helmet>

      <section className="relative pt-28 pb-16 lg:pt-36">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative min-h-[620px] sm:min-h-[min(720px,78vh)] overflow-hidden rounded-[2.5rem] bg-card-bg shadow-2xl">
            <motion.img initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: customEase }} alt="Architectural exterior of a minimalist wooden cabin situated on a rocky ridge beside a tranquil river" className="absolute inset-0 w-full h-full object-cover" src={heroImage} decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="relative z-10 flex min-h-[620px] sm:min-h-[min(720px,78vh)] flex-col justify-between p-7 sm:p-10 lg:p-16">
              <motion.p variants={itemVariants} className="font-label text-xs uppercase tracking-[0.3em] text-accent">Jadhav Architects / 01</motion.p>
              <div className="max-w-3xl">
                <motion.h1 variants={itemVariants} className="font-headline font-extrabold text-[15vw] sm:text-[11vw] lg:text-[clamp(72px,9vw,148px)] leading-[0.84] tracking-tight uppercase text-primary-text">
                  Wilderness<br /><span className="text-accent italic">Riverside</span><br />Cabins
                </motion.h1>
                <div className="mt-8 flex flex-col gap-7 sm:block">
                  <motion.p variants={itemVariants} className="font-body text-base md:text-lg text-primary-text/80 font-light leading-relaxed max-w-md">
                    Curating bespoke architectural escapes where modern geometry meets the untamed flow of nature. Experience elevated living in the heart of the wild.
                  </motion.p>
                  <motion.div variants={itemVariants} className="sm:absolute sm:bottom-16 sm:right-10 lg:right-16">
                    <Link to="/contact" className="group inline-flex items-center gap-4 bg-accent text-on-accent px-8 py-4 rounded-full font-headline font-bold uppercase tracking-[0.1em] shadow-2xl hover:scale-105 transition-all duration-300" aria-label="Enquire about booking our cabins">
                      Book Now <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
              <span className="font-label text-xs uppercase tracking-[0.25em] text-primary-text/80">A place to return to</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto px-6 md:px-12 py-16 lg:py-20">
        <div className="relative grid md:grid-cols-[1.45fr_1fr] gap-8 lg:gap-12 items-start border-t border-primary-text/15 pt-4">
          <p className="font-label text-[9px] uppercase tracking-[0.3em] text-accent md:absolute md:left-0 md:top-4">02 / The practice</p>
          <div className="max-w-xl text-left md:pt-8"><h2 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.94]">Spaces that make the landscape feel closer.</h2><p className="font-body text-primary-text/65 text-sm md:text-base leading-relaxed max-w-lg mt-5">We design quiet, tactile places for living well. Every project begins with its setting and ends with an architecture that feels inevitable.</p></div>
          <div className="md:-mt-1 lg:translate-x-6 lg:scale-105 lg:origin-center"><div className="relative aspect-[1.35/1] overflow-hidden rounded-[1.5rem] bg-transparent"><img src={introImage} alt="Three-dimensional architectural house render surrounded by landscape" loading="lazy" className="w-full h-full object-contain p-4 transition-transform duration-700 hover:scale-105" /></div><div className="flex items-start justify-between gap-4 mt-4"><p className="font-label text-[9px] uppercase tracking-[0.18em] text-primary-text/50 leading-loose">Homes, retreats, and places with a slower rhythm.</p><Link to="/about" className="shrink-0 inline-flex items-center gap-2 text-accent font-label text-[9px] uppercase tracking-[0.16em] hover:gap-4 transition-all">Our approach <span className="material-symbols-outlined text-sm">arrow_forward</span></Link></div></div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto px-6 md:px-12 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-5 items-stretch">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: customEase }} className="relative min-h-[360px] lg:min-h-[520px] overflow-hidden rounded-[2.5rem] bg-card-bg">
            <img src={featuredImage} alt={`${projects[0].title} architectural project exterior`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-5"><div><p className="font-label text-xs uppercase tracking-[0.2em] text-accent mb-2">Featured work / 2024</p><h3 className="font-headline text-2xl md:text-4xl font-bold">The Void House</h3></div><Link to="/gallery" aria-label="View featured project" className="shrink-0 w-12 h-12 rounded-full bg-accent text-on-accent flex items-center justify-center hover:scale-110 transition-transform"><span className="material-symbols-outlined">arrow_outward</span></Link></div>
          </motion.div>
          <div className="rounded-[2.5rem] bg-section-tone p-8 md:p-10 flex flex-col justify-between">
            <div><p className="font-label text-xs uppercase tracking-[0.3em] text-accent">A considered approach</p><p className="font-headline text-2xl md:text-3xl leading-tight mt-8">Architecture can be both a refuge and a way of seeing.</p></div>
            <div className="border-t border-primary-text/15 pt-6 mt-12"><p className="font-body text-primary-text/65 leading-relaxed">From the first sketch to the final detail, every decision is shaped by light, material, and the life that will unfold there.</p><Link to="/contact" className="inline-flex items-center gap-3 text-accent font-label text-xs uppercase tracking-[0.2em] mt-7">Start a conversation <span className="material-symbols-outlined text-base">arrow_forward</span></Link><div className="mt-10 pt-6 border-t border-primary-text/15"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden shrink-0"><img alt="Headshot of Minal Jadhav, a client of Jadhav Architects" className="w-full h-full object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" loading="lazy" /></div><div><p className="font-headline font-bold text-sm text-primary-text">minal jadhav</p><div className="flex text-accent scale-75 origin-left" aria-label="5 star rating">{[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined filled" aria-hidden="true">star</span>)}</div></div></div><p className="font-body text-sm text-primary-text/75 leading-relaxed">"From the first sketch to the final detail, the team made the entire process feel effortless. Our cabin is beautiful, comfortable, and perfectly connected to its surroundings."</p></div></div>
          </div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto px-6 md:px-12 pb-20 lg:pb-32">
        <div className="flex items-end justify-between gap-6 border-t border-primary-text/15 pt-8 mb-8"><div><p className="font-label text-xs uppercase tracking-[0.3em] text-accent mb-4">03 / Selected work</p><h2 className="font-headline font-bold text-3xl md:text-5xl">Built for belonging.</h2></div><Link to="/gallery" className="hidden sm:inline-flex items-center gap-3 text-accent font-label text-xs uppercase tracking-[0.2em]">View all work <span className="material-symbols-outlined text-base">arrow_forward</span></Link></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {projects.slice(0, 4).map((project, index) => (
            <motion.article key={project.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: index * 0.08, ease: customEase }} className={`group ${index === 1 || index === 3 ? 'lg:mt-12' : ''}`}>
              <Link to="/gallery" className="block" aria-label={`View ${project.title} project`}><div className={`overflow-hidden rounded-3xl bg-card-bg ${index === 0 ? 'aspect-[4/5]' : index === 1 ? 'aspect-[5/6]' : index === 2 ? 'aspect-[4/5]' : 'aspect-[5/6]'}`}><img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div><div className="flex items-start justify-between gap-3 pt-4"><div><h3 className="font-headline font-bold text-base text-primary-text">{project.title}</h3><p className="font-label text-xs uppercase tracking-[0.12em] text-primary-text/50 mt-1">{project.subtitle}</p></div><span className="material-symbols-outlined text-accent text-lg">arrow_outward</span></div></Link>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
