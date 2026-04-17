import React from 'react'
import AboutHero from '@/components/about/herosection'
import Milestones from '@/components/about/Milestones'
import Valuesection from '@/components/about/Valuesection'
import Teamsection from '@/components/about/Teamsection'
import Ceosection from '@/components/about/Ceosection'
import Approach from '@/components/home/Approach'
import Design from '@/components/home/Design'
import Faq from '@/components/home/Faq'
import Blog from '@/components/home/Blog'

function Page() {
  return (
    <>
      <AboutHero />
      <Milestones />
      <Valuesection />
      <Ceosection />
      <Teamsection />
      <Approach />
      <Design />
      <Faq />
      <Blog />
    
      
      </>
  )
}

export default Page;