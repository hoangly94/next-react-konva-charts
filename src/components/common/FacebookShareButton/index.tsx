import React from 'react'
import _ from 'lodash';
const ZaloShareButton = () => {
    return (
        <div dangerouslySetInnerHTML={
            {
                __html: `<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>`
            }
        }
        ></div>
    )
}
export default ZaloShareButton