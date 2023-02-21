import React from 'react';
import Head from 'next/head';
import Link from 'next/link';



export default function Main() {

    return (
        <Page>
            <p>
                <em>Meshy-UI</em> is a template designed for speedy application development with an emphasis in astronomy.  It uses a collection of third party
                open-source libraries and incorporates them into a framework that focuses on application logic instead of the
                necessary but boilerplate-like aspect of JavaScript web development. By combining libraries that is best suited for web-based astronomy
                application development, <em>Meshy-UI</em> allows developer to concentrate on requirements instead of learning the technology needed to fulfill
                those requirements.
            </p>
            <div className='grid'>
                <a href='https://nextjs.org/' className='card'>
                    <h3>Next.js</h3>
                    <ul>
                        <li>React Framework</li>
                        <li>Build and bundling</li>
                        <li>Developer environment</li>
                        <li>URL Routing</li>
                        <li>Styled JSX</li>
                    </ul>
                </a>

                <a href='https://github.com/Caltech-IPAC/firefly' className='card'>
                    <h3>Firefly</h3>
                    <ul>
                        <li>Advanced image visualization</li>
                        <li>Comprehensive plotting tool</li>
                        <li>Powerful table display</li>
                        <li>Shared data model</li>
                        <li>Firefly API</li>
                    </ul>
                </a>
                <div href='https://aladin.u-strasbg.fr/AladinLite/doc/' className='card'>
                    <h3>Aladin</h3>
                    <ul>
                        <li>Image survey visualization</li>
                        <li>Lightweight, fast and interactive</li>
                    </ul>
                </div>
                <a href='https://react-hook-form.com/' className='card'>
                    <h3>React Hook Form</h3>
                    <ul>
                        <li>HTML standard</li>
                        <li>Built-in validation</li>
                        <li>Intuitive, feature-complete API</li>
                    </ul>
                </a>
                <a href='https://github.com/loitly/meshy-ui/' className='card'>
                    <h3>Meshy-UI</h3>
                    <ul>
                        <li>Ready-for-use Template</li>
                        <li>JSX for Firefly and Aladin</li>
                        <li>Unit Test</li>
                        <li>Simplified Form</li>
                        <li>Containerized Deployment</li>
                    </ul>
                </a>
                <Link href="/gator/">
                    <a className='card'>
                        <h3>Examples: Gator</h3>
                        <ul>
                            <li>Firefly JSX</li>
                            <li>Firefly API</li>
                            <li>Meshy Form</li>
                            <li>Styled JSX</li>
                        </ul>
                    </a>
                </Link>
            </div>

            <style jsx> {`
                p {
                    font-size: larger;
                }
                .grid {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  margin-top: 3rem;
                }
                .card {
                  min-width: 350px;
                  max-width: 350px;
                  min-height: 175px;
                  margin: 1rem;
                  flex-basis: 35%;
                  padding: 1rem 1.5rem;
                  text-align: left;
                  color: inherit;
                  text-decoration: none;
                  border: 1px solid #eaeaea;
                  border-radius: 5px;
                  // transition: color 0.15s ease, border-color 0.15s ease;
                }
                .card > ul {
                  margin-left: -1rem;
                }
                .card li {
                  list-style-type: square;
                }
                .card:hover,
                .card:focus,
                .card:active {
                  color: #0070f3;
                  border-color: #0070f3;
                  background-color: #f5f5f5;
                }
        
                .card h3 {
                  margin: 0 0 1rem 0;
                  font-size: 1.5rem;
                }        
            `} </style>
        </Page>
    );
}

export function Page(props) {
    return (
        <div id='page' title='Meshy-UI'>
            <Head>
                <title>Meshy-UI</title>
            </Head>
            <div id='banner'>Meshy-UI</div>
            <Menu/>
            <div id='content'>{props.children}</div>

            <style jsx> {`
            #page {
                display: flex;
                flex-direction: column;
                position: absolute;
                top:0;
                bottom:0;
                left: 0;
                right: 0;
            }
            #banner {
                font: bolder oblique xxx-large Georgia,Arial;
                color: white;
                background: black;
                padding: .2em;
                display: flex;
                align-items: center;
                justify-content: center;            
                background-color: black;
                opacity: 0.8;
                background-image: linear-gradient(0deg, black 90%, #111 10%);
                background-size: 5px 5px;
            }
            #content {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                padding: 10px 100px;
            }       
            `} </style>
        </div>
    );
}

function Menu() {
    return (
        <div id='menu'>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/about">
                <a>About Us</a>
            </Link>
            <Link href="/docs">
                <a>Documentation</a>
            </Link>
            <style jsx> {`
                #menu {
                    display: inline-flex;
                    background-color: #222;
                    padding: .3em;
                    justify-content: space-around;
                    align-items: center; 
                }
                a {
                    color: white;
                }               
                a:hover {
                    color: #0070f3;
                }               
            `} </style>
        </div>
    );
}