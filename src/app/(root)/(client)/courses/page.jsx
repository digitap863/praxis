import React from 'react'
import Herosection from '@/components/courses/Herosection'
import CourseList from '@/components/courses/courses'
import Faq from '@/components/home/Faq';
import Blog from '@/components/home/Blog';

function Page() {
  return (
    <>
      <Herosection />
        <CourseList />
      <Faq />
      <Blog />
    </>
  )
}

export default Page;