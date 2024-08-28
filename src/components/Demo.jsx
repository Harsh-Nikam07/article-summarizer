import {useState, useEffect} from 'react';
import {copy, linkIcon, loader, tick} from "../assets"
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {

  const [article, setArticle] = useState({
    url:"",
    summary:""
  })

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }
  },[])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {data} = await getSummary({ articleUrl: article.url });

    if(data?.summary){
      const newArticle = { ...article, summary:data.summary };
      
      const updatedAllArticels = [newArticle, ...allArticles]
      setArticle(newArticle);
      setAllArticles(updatedAllArticels);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticels));
    }
  }

  const handleCopy = (copyUrl => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  })


  return (
    <>
      <section className='mt-16 w-full max-w-xl'>
        <div className='flex flex-col w-full gap-2'>
          <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
            <img src={linkIcon} alt="Link_Icon" className='absolute left-0 my-2 ml-3 w-5' />

            <input 
              type="url" 
              placeholder='Enter a URL' 
              value={article.url} 
              
              onChange={(e) => setArticle({
                ...article, url:e.target.value
              })} 
              
              className='url_input peer'
              required/>
            <button type='submit' className='submit_btn peer-focus:bg-black peer-focus:text-white'>
              <MdOutlineSubdirectoryArrowLeft/>
            </button>
          </form>

          {/* browse history */}



          <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>

              {
                allArticles.map((item, index) => {
                  return (
                    <div key={`link-${index}`} onClick={() => setArticle(item)} className='link_card'>

                      <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                        <img src={copied === item.url ? tick : copy} alt="Copy_Icon"  className='w-[40%] h-[40%] object-contain' />
                      </div>

                      <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                        {item.url}
                      </p>
                      
                    </div>
                  );
                })
              }

          </div>


        </div>

        {/* display results */}

        <div className='my-10 max-w-full flex justify-center items-center'>
          {
            isFetching ? (<img src={loader} alt="Loader" className='w-30 h-10 object-contain' />

            ) : error ? (
              <div className='flex justify-center items-center flex-col'>
                <span className='text-xl text-red-800 font-inter font-bold text-center'>Error</span>
                <p>loading the Results</p>
                <span className='text-center text-red-900 font-satoshi'>
                  {error?.data?.error}
                </span>
              </div>
            ) : (
              article.summary && (
                <div className='flex flex-col gap-3'>
                  <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                    Article <span className='blue_gradient'>Summary</span>
                  </h2>


                  <div className='summary_box overflow-y-auto '>
                    <p className='font-inter font-medium text-sm text-gray-700'>
                      {article.summary}
                    </p>
                  </div>
                </div>
              )
            )
          }
        </div>
      </section>
    </>
  )
}

export default Demo