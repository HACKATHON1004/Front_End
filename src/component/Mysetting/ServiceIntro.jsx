import React, { useState, useRef, useEffect } from 'react';
import styles from '../../cssModule/ServiceIntro.module.css';


function ServiceIntro(){

    return(
        <div className={styles.container}>
            <div className={styles.Form}>
                <div className={styles.ServiceIntroWapper}>
                    <div className={styles.ServiceIntroduction}>서비스 소개</div>
                </div>
                <div className={styles.SourcesWapper}>
                    <div className={styles.Sources}>출처</div>
                </div>
            </div>
            
        </div>
    );
};
export default ServiceIntro