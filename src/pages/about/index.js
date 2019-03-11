/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
/* App imports */
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Utils from '../../utils'
import * as style from './index.module.less'

const About = ({ data: { profilePhoto, skillIcons, toolIcons } }) => {
  return (
    <Layout>
      <SEO
        title="About"
        description="A brief summary of this blog and my work"
        path="about"
      />
      <div className={style.container}>
        <div className={style.photo}>
          <Img fluid={profilePhoto.childImageSharp.fluid} />
        </div>
        <div className={style.content}>
          <h1>Hi, I'm Riya!</h1>
          <h2>Software Developer</h2>
          <p>
          Riya Dashoriya (@ReeyahSDasoriya) is a Senior Software Engineer at <a href="https://www.solutionreach.com/" target="_blank" className={style.talkLinks}>Solutionreach</a>, Salt Lake City.
          She is also a <a href="https://www.meetup.com/GDG-Salt-Lake/" target="_blank" className={style.talkLinks}>Google Developers Group Salt Lake</a> co-organizer and WTM Ambassador. Riya has veritable curiosity and
          passion to dig into things and find out how they work. Her current favorites in tech are <span className={style.fav}>React,
          Accessibility and Actions on Google Assistant.</span>
          <br />Code, Coffee, Cake, Chocolates, Cricket, Coke is everything she dreams about.
          If not coding, she is mostly baking, sleeping or dancing.
          </p>
          <br />
          <h2>Skills</h2>
          <ImageList edges={skillIcons.edges} />

           {/*  <h2>Tools</h2>
           <ImageList edges={toolIcons.edges} />
           */}
          <h2>Upcoming talks/events</h2>
          <ul>
            <li>Event host for Women Techmakers Salt Lake's International Women's Day conference on March 23, 2019. <a href="http://wtmslc.eventbrite.com/" className={style.talkLinks} target="_blank">RSVP here</a></li>
            <li>Speaking in Denver on Actions on Google Assistant for GDG Denver meetup. <a href="https://www.meetup.com/GDG-Denver/events/259164156/" className={style.talkLinks} target="_blank">RSVP here</a></li>
            <li>Speaking for Women Tech Council's SheTech Explorer day on April 9, 2019. <a href="http://shetechexplorer.com/" className={style.talkLinks} target="_blank">More details</a></li>
            <li>Speaking at Open West Conference on April 10-12: - Why's and How's of #a11y and Make Google Assistant Do The Thing For You Workshop. <a href="https://openwest.org/" className={style.talkLinks} target="_blank"> Get your tickets now!</a></li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    profilePhoto: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
    skillIcons: PropTypes.object.isRequired,
    toolIcons: PropTypes.object.isRequired,
  }),
}

const ImageList = ({ edges }) => (
  <div className={style.iconsContainer}>
    {edges
      .sort((edgeA, edgeB) =>
        edgeA.node.name.toLowerCase() > edgeB.node.name.toLowerCase() ? 1 : -1
      )
      .map(({ node: { name, childImageSharp } }) => (
        <div className={style.iconWrapper} key={name}>
          <Img
            fixed={childImageSharp.fixed}
            alt={name + ' logo'}
            title={name}
          />
          <label>
            {iconsNameMap[name] ? iconsNameMap[name] : Utils.capitalize(name)}
          </label>
        </div>
      ))}
  </div>
)

ImageList.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.object.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
}

export const query = graphql`
  {
    profilePhoto: file(name: { eq: "riya_profile_photo" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    skillIcons: allFile(filter: { dir: { regex: "/about/skills$/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fixed(width: 50) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    }
    toolIcons: allFile(filter: { dir: { regex: "/about/tools$/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fixed(width: 50) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    }
  }
`
// Use to set specific icons names
const iconsNameMap = {
  css: 'CSS',
  html: 'HTML',
  jquery: 'JQuery',
  nodejs: 'Node.js',
  vuejs: 'Vue.js',
  gruntjs: 'Grunt.js',
}

export default About
