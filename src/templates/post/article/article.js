/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import 'prismjs/themes/prism-solarizedlight.css';
import './highlight-syntax.less'
/* App imports */
import * as style from './article.module.less'

const Article = ({ html }) => (
  <div className={style.container}>
    <article dangerouslySetInnerHTML={{ __html: html }} ></article>
  </div>
)

export default Article;

Article.propTypes = {
  html: PropTypes.string.isRequired
}