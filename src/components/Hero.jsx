import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='w-full flex justify-between items-center flex-row mb-10 pt-3'>
        <img src={logo} alt="logo"  className='w-28 object-contain'/>
        <button 
          type='button' 
          onClick={() => window.open("https://github.com/Harsh-Nikam07", "_blank", "noopener,noreferrer")}
          className='black_btn'>
          Github
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden'/>
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
        <h2 className='desc'>
          Simplify your reading with summerize, an open-source article summarizer that transforms lengthy articles into clear and consice summaries
        </h2>
    </header>
  )
}

export default Hero