import { useEffect, useState, useRef } from 'react';
import styles from '../../cssModule/post.module.css';
import is from '../../images/1.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PostList({ field, eventTime }) {
  const [posts, setPosts] = useState([]);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  console.log(eventTime);
  console.log(posts);

  function handleNavigatePostContent(id) {
    navigate(`post/${id}`);
  }

  useEffect(() => {
    const today = new Date(); // 오늘 날짜 객체 생성

    const filterOldPosts = (data) => {
      return data.filter((post) => {
        // eventTime을 "yyyy-mm-dd-HH:MM"에서 "yyyy-mm-ddTHH:MM:00"로 변환
        const date = post.eventTime.slice(0, 10);
        const postDate = new Date(date);
        return postDate >= today; // 오늘보다 이후의 날짜인지 확인
      });
    };

    if (isFirstRender.current) {
      axios.get('http://13.209.239.251:8080/recruit')
        .then(res => {
          const filteredPosts = filterOldPosts(res.data);
          setPosts(filteredPosts);
          isFirstRender.current = false;
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      axios.get(`http://13.209.239.251:8080/recruit/eventTime/${eventTime}`)
        .then(res => {
          const filteredPosts = filterOldPosts(res.data);
          setPosts(filteredPosts);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [eventTime]);

  return (
    <>
      <div className={styles.tableHead}>
        <div>제목</div>
        <div>글쓴이</div>
        <div>날짜</div>
        <div>조회</div>
        <div>{field}</div>
      </div>
      {posts.map((item, index) => {
        return (
          <div onClick={()=>handleNavigatePostContent(item.id)} key={index} className={styles.tableBody}>
            <div className={styles.tableHead} key={index}>
              <div>{item.title}</div>
              <div className={styles.author}>
                <div><img style={{ height: "29px", width: "29px" }} src={is} /></div>
                <div style={{ width: "36px" }}>{item.username}</div>
              </div>
              <div>{item.createDate.slice(2, 10)}</div>
              <div>{item.view}</div>
              <div>{field === "추천" ? item.recommendations : item.currentRecruit + "/" + item.totalRecruit}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
