import styles from '../../cssModule/post.module.css'
import is from '../../images/1.svg'

export default function PostList({field}) {
    //axios로 게시글 정보 가져와야됨
    
    const posts = [
        {
          title: '축구 할 사람 구함 (3)',
          author: '민머시키',
          date: '24.07.16',
          views: '1550회',
          recruit: 5,
          currentRecruit: 3,
          recommendations: '100',
          imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
        },
        {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recruit: 5,
            currentRecruit: 3,
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recruit: 5,
            currentRecruit: 3,
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            recruit: 5,
            currentRecruit: 3,
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recruit: 5,
            currentRecruit: 3,
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recruit: 5,
            currentRecruit: 3,
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            recruit: 5,
            currentRecruit: 3,
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            recruit: 5,
            currentRecruit: 3,
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            recruit: 5,
            currentRecruit: 3,
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            recruit: 5,
            currentRecruit: 3,
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recruit: 5,
            currentRecruit: 3,
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            recruit: 5,
            currentRecruit: 3,
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          }
        // Add more posts as needed
      ];
    
    return (
      <>
        <div className={styles.tableHead}>
          <div>제목</div>
          <div>글쓴이</div>
          <div>날짜</div>
          <div>조회</div>
          <div>{field}</div>
        </div>
        {posts.map((item, index)=>{
            return(
                <div key={index} className={styles.tableBody}>
                  <div className={styles.tableHead} key={index}>
                    <div>{item.title}</div>
                    <div className={styles.author}>
                      <div><img style={{height:"29px", width:"29px"}} src={is}/></div>
                      <div style={{width:"36px"}}>{item.author}</div>
                    </div>
                    <div>{item.date}</div>
                    <div>{item.views}</div>
                    <div>{field==="추천"?item.recommendations:item.currentRecruit+"/"+item.recruit}</div>
                  </div>
                </div>
            )
          })}
      </>
    )
}