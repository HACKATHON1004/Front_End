import styles from '../../cssModule/post.module.css'
import is from '../../images/1.svg'

export default function PostList() {
    //axios로 게시글 정보 가져와야됨
    
    const posts = [
        {
          title: '축구 할 사람 구함 (3)',
          author: '민머시키',
          date: '24.07.16',
          views: '1550회',
          recommendations: '100',
          imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
        },
        {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
          {
            title: '축구 할 사람 구함 (3)',
            author: '민머시키',
            date: '24.07.16',
            views: '1550회',
            recommendations: '100',
            imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
          },
        {
          title: '축구가 싫어요',
          author: '민머시키',
          date: '24.07.16',
          views: '10회',
          recommendations: '-10',
          imgSrc: 'path/to/image.jpg' // Replace with the actual path to the image
        },
        // Add more posts as needed
      ];
    
    return (
        posts.map((item, index)=>{
            return(
              <div className={styles.tableHead} key={index}>
                <div>{item.title}</div>
                <div className={styles.author}>
                  <div><img style={{height:"29px", width:"29px"}} src={is}/></div>
                  <div style={{width:"36px"}}>{item.author}</div>
                </div>
                <div>{item.date}</div>
                <div>{item.views}</div>
                <div>{item.recommendations}</div>
              </div>
            )
          })
    )
}