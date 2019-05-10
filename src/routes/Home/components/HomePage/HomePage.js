import React from 'react'
import PropTypes from 'prop-types'
import Scrollbar from 'react-scrollbars-custom'
import ReactPlayer from 'react-player'
import AppImage from 'static/App.png'
import './Homepage.css'

const Home = ({ classes }) => (
  <Scrollbar className={classes.scrollbar} noScrollX>
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title mt-0">VocaCoord</h1>
            <p className="hero-paragraph">
              Education, personalized for every student. Live, on-demand
              subtitles for students who are hearing impaired. In-depth
              explanations for students with learning disabilities.
            </p>
            <div className="hero-cta">
              <a
                className="button button-shadow"
                href="https://github.com/VocaCoord"
                target="_blank"
                rel="noopener noreferrer">
                Learn more
              </a>
              <a
                className="button button-primary button-shadow"
                href="https://github.com/VocaCoord/vocacoord/releases/tag/v1.0.1"
                target="_blank"
                rel="noopener noreferrer">
                Early access
              </a>
            </div>
          </div>
          <div className="hero-app">
            <div className="hero-app-illustration">
              <svg width="999" height="931" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient
                    x1="92.827%"
                    y1="0%"
                    x2="53.422%"
                    y2="80.087%"
                    id="hero-shape-a">
                    <stop stopColor="#F9425F" offset="0%" />
                    <stop stopColor="#F97C58" stopOpacity="0" offset="100%" />
                  </linearGradient>
                  <linearGradient
                    x1="92.827%"
                    y1="0%"
                    x2="53.406%"
                    y2="80.12%"
                    id="hero-shape-b">
                    <stop stopColor="#47A1F9" offset="0%" />
                    <stop
                      stopColor="#F9425F"
                      stopOpacity="0"
                      offset="80.532%"
                    />
                    <stop stopColor="#FDFFDA" stopOpacity="0" offset="100%" />
                  </linearGradient>
                  <linearGradient
                    x1="8.685%"
                    y1="23.733%"
                    x2="85.808%"
                    y2="82.837%"
                    id="hero-shape-c">
                    <stop stopColor="#FFF" stopOpacity="0.48" offset="0%" />
                    <stop stopColor="#FFF" stopOpacity="0" offset="100%" />
                  </linearGradient>
                  <linearGradient
                    x1="79.483%"
                    y1="15.903%"
                    x2="38.42%"
                    y2="70.124%"
                    id="hero-shape-d">
                    <stop stopColor="#47A1F9" offset="0%" />
                    <stop stopColor="#FDFFDA" stopOpacity="0" offset="100%" />
                  </linearGradient>
                  <linearGradient
                    x1="99.037%"
                    y1="26.963%"
                    x2="24.582%"
                    y2="78.557%"
                    id="hero-shape-e">
                    <stop stopColor="#FDFFDA" stopOpacity="0.64" offset="0%" />
                    <stop
                      stopColor="#F97C58"
                      stopOpacity="0.24"
                      offset="42.952%"
                    />
                    <stop stopColor="#F9425F" stopOpacity="0" offset="100%" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g className="hero-shape-top">
                    <path
                      d="M680.188 0c-23.36 69.79-58.473 98.3-105.34 85.531-70.301-19.152-189.723-21.734-252.399 91.442-62.676 113.175-144.097 167.832-215.195 118.57C59.855 262.702 24.104 287.85 0 370.988L306.184 566.41c207.164-4.242 305.67-51.612 295.52-142.11-10.152-90.497 34.533-163.55 134.054-219.16l4.512-119.609L680.188 0z"
                      fill="url(#hero-shape-a)"
                      transform="translate(1)"
                      className="is-moving-object is-translating"
                      data-translating-factor="280"
                    />
                    <path
                      d="M817.188 222c-23.36 69.79-58.473 98.3-105.34 85.531-70.301-19.152-189.723-21.734-252.399 91.442-62.676 113.175-144.097 167.832-215.195 118.57-47.399-32.841-83.15-7.693-107.254 75.445L443.184 788.41c207.164-4.242 305.67-51.612 295.52-142.11-10.152-90.497 34.533-163.55 134.054-219.16l4.512-119.609L817.188 222z"
                      fill="url(#hero-shape-b)"
                      transform="rotate(-53 507.635 504.202)"
                      className="is-moving-object is-translating"
                      data-translating-factor="100"
                    />
                  </g>
                  <circle
                    fill="url(#hero-shape-c)"
                    cx="336"
                    cy="190"
                    r="190"
                    className="is-moving-object is-translating"
                    data-translating-factor="50"
                    transform="translate(191 416)"
                  />
                  <path
                    d="M683.766 133.043c-112.048-90.805-184.688-76.302-217.92 43.508-33.23 119.81-125.471 124.8-276.722 14.972-3.156 120.356 53.893 200.09 171.149 239.203 175.882 58.67 346.695-130.398 423.777-239.203 51.388-72.536 17.96-92.03-100.284-58.48z"
                    fill="url(#hero-shape-d)"
                    transform="translate(191 416)"
                    className="is-moving-object is-translating"
                    data-translating-factor="80"
                  />
                  <path
                    d="M448.206 223.247c-97.52-122.943-154.274-117.426-170.26 16.55C261.958 373.775 169.717 378.766 1.222 254.77c-9.255 95.477 47.794 175.211 171.148 239.203 185.032 95.989 424.986-180.108 424.986-239.203 0-39.396-49.717-49.904-149.15-31.523z"
                    fill="url(#hero-shape-e)"
                    transform="matrix(-1 0 0 1 788.61 416)"
                    className="is-moving-object is-translating"
                    data-translating-factor="100"
                  />
                </g>
              </svg>
            </div>
            <img className="device-mockup" src={AppImage} alt="App preview" />
            <div className="hero-app-dots hero-app-dots-1">
              <svg width="124" height="75" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#FFF"
                    d="M33.392 0l3.624 1.667.984 3.53-1.158 3.36L33.392 10l-3.249-1.639L28 5.196l1.62-3.674z"
                  />
                  <path
                    fill="#7487A3"
                    d="M74.696 3l1.812.833L77 5.598l-.579 1.68L74.696 8l-1.624-.82L72 5.599l.81-1.837z"
                  />
                  <path
                    fill="#556B8B"
                    d="M40.696 70l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L38 72.599l.81-1.837z"
                  />
                  <path
                    fill="#7487A3"
                    d="M4.314 37l2.899 1.334L8 41.157l-.926 2.688L4.314 45l-2.6-1.31L0 41.156l1.295-2.94zM49.314 32l2.899 1.334.787 2.823-.926 2.688L49.314 40l-2.6-1.31L45 36.156l1.295-2.94z"
                  />
                  <path
                    fill="#556B8B"
                    d="M99.696 56l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L97 58.599l.81-1.837zM112.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L110 39.599l.81-1.837zM82.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L80 39.599l.81-1.837zM122.618 57l1.087.5.295 1.059-.347 1.008-1.035.433-.975-.492-.643-.95.486-1.101z"
                  />
                </g>
              </svg>
            </div>
            <div className="hero-app-dots hero-app-dots-2">
              <svg width="124" height="75" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#556B8B"
                    d="M33.392 0l3.624 1.667.984 3.53-1.158 3.36L33.392 10l-3.249-1.639L28 5.196l1.62-3.674zM74.696 3l1.812.833L77 5.598l-.579 1.68L74.696 8l-1.624-.82L72 5.599l.81-1.837zM40.696 70l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L38 72.599l.81-1.837zM4.314 37l2.899 1.334L8 41.157l-.926 2.688L4.314 45l-2.6-1.31L0 41.156l1.295-2.94zM49.314 32l2.899 1.334.787 2.823-.926 2.688L49.314 40l-2.6-1.31L45 36.156l1.295-2.94z"
                  />
                  <path
                    fill="#FFF"
                    d="M99.696 56l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L97 58.599l.81-1.837z"
                  />
                  <path
                    fill="#556B8B"
                    d="M112.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L110 39.599l.81-1.837z"
                  />
                  <path
                    fill="#FFF"
                    d="M82.696 37l1.812.833.492 1.765-.579 1.68-1.725.722-1.624-.82L80 39.599l.81-1.837z"
                  />
                  <path
                    fill="#556B8B"
                    d="M122.618 57l1.087.5.295 1.059-.347 1.008-1.035.433-.975-.492-.643-.95.486-1.101z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="features section">
      <div className="container">
        <div className="features-inner section-inner has-bottom-divider">
          <h2 className="section-title mt-0">A Revolution In Education</h2>
          <div className="features-wrap">
            <div className="feature is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <svg
                    width="64"
                    height="64"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="50%"
                        y2="0%"
                        id="feature-1-a">
                        <stop
                          stopColor="#F9425F"
                          stopOpacity="0.8"
                          offset="0%"
                        />
                        <stop
                          stopColor="#47A1F9"
                          stopOpacity="0.16"
                          offset="100%"
                        />
                      </linearGradient>
                      <linearGradient
                        x1="50%"
                        y1="100%"
                        x2="50%"
                        y2="0%"
                        id="feature-1-b">
                        <stop stopColor="#FDFFDA" offset="0%" />
                        <stop
                          stopColor="#F97059"
                          stopOpacity="0.798"
                          offset="49.935%"
                        />
                        <stop
                          stopColor="#F9425F"
                          stopOpacity="0"
                          offset="100%"
                        />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M24 48H0V24C0 10.745 10.745 0 24 0h24v24c0 13.255-10.745 24-24 24"
                        fill="url(#feature-1-a)"
                      />
                      <path
                        d="M40 64H16V40c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
                        fill="url(#feature-1-b)"
                      />
                    </g>
                  </svg>
                </div>
                <h3 className="feature-title mt-24">Live Subtitles</h3>
                <p className="text-sm mb-0">
                  Real-time subtitles are sent to students as teachers give
                  their lessons.
                </p>
              </div>
            </div>
            <div className="feature is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <svg
                    width="68"
                    height="64"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="50%"
                        y2="0%"
                        id="feature-2-a">
                        <stop
                          stopColor="#F9425F"
                          stopOpacity="0.8"
                          offset="0%"
                        />
                        <stop
                          stopColor="#47A1F9"
                          stopOpacity="0.16"
                          offset="100%"
                        />
                      </linearGradient>
                      <linearGradient
                        x1="50%"
                        y1="100%"
                        x2="50%"
                        y2="0%"
                        id="feature-2-b">
                        <stop stopColor="#FDFFDA" offset="0%" />
                        <stop
                          stopColor="#F97059"
                          stopOpacity="0.798"
                          offset="49.935%"
                        />
                        <stop
                          stopColor="#F9425F"
                          stopOpacity="0"
                          offset="100%"
                        />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M9.941 63.941v-24c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24h-24z"
                        fill="url(#feature-2-a)"
                        transform="rotate(45 33.941 39.941)"
                      />
                      <path
                        d="M16 0v24c0 13.255 10.745 24 24 24h24V24C64 10.745 53.255 0 40 0H16z"
                        fill="url(#feature-2-b)"
                      />
                    </g>
                  </svg>
                </div>
                <h3 className="feature-title mt-24">Large Scale</h3>
                <p className="text-sm mb-0">
                  Supports hundreds of simultaneous connections, ensuring no
                  student will ever be left out.
                </p>
              </div>
            </div>
            <div className="feature is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <svg
                    width="64"
                    height="64"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient
                        x1="50%"
                        y1="100%"
                        x2="50%"
                        y2="43.901%"
                        id="feature-3-a">
                        <stop
                          stopColor="#F97059"
                          stopOpacity="0.798"
                          offset="0%"
                        />
                        <stop
                          stopColor="#F9425F"
                          stopOpacity="0"
                          offset="100%"
                        />
                      </linearGradient>
                      <linearGradient
                        x1="58.893%"
                        y1="100%"
                        x2="58.893%"
                        y2="18.531%"
                        id="feature-3-b">
                        <stop
                          stopColor="#F9425F"
                          stopOpacity="0.8"
                          offset="0%"
                        />
                        <stop
                          stopColor="#47A1F9"
                          stopOpacity="0"
                          offset="100%"
                        />
                      </linearGradient>
                      <linearGradient
                        x1="50%"
                        y1="100%"
                        x2="50%"
                        y2="0%"
                        id="feature-3-c">
                        <stop stopColor="#FDFFDA" offset="0%" />
                        <stop
                          stopColor="#F97059"
                          stopOpacity="0.798"
                          offset="49.935%"
                        />
                        <stop
                          stopColor="#F9425F"
                          stopOpacity="0"
                          offset="100%"
                        />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="url(#feature-3-a)"
                        opacity="0.32"
                        d="M0 24h64v40H0z"
                      />
                      <path fill="url(#feature-3-b)" d="M40 24H24L0 64h64z" />
                      <path
                        d="M10 10v22c0 12.15 9.85 22 22 22h22V32c0-12.15-9.85-22-22-22H10z"
                        fill="url(#feature-3-c)"
                        transform="rotate(45 32 32)"
                      />
                    </g>
                  </svg>
                </div>
                <h3 className="feature-title mt-24">Context Aware</h3>
                <p className="text-sm mb-0">
                  Blazing fast Speech-to-Text with situational awareness that
                  sends students relevant, digestible information.
                </p>
              </div>
            </div>
            {false && (
              <React.Fragment>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="64"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient
                            x1="0%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-4-a">
                            <stop
                              stopColor="#F9425F"
                              stopOpacity=".8"
                              offset="0%"
                            />
                            <stop
                              stopColor="#47A1F9"
                              stopOpacity=".16"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-4-b">
                            <stop stopColor="#FDFFDA" offset="0%" />
                            <stop
                              stopColor="#F97059"
                              stopOpacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stopColor="#F9425F"
                              stopOpacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M24 64H0V40c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-4-a)"
                            transform="matrix(-1 0 0 1 48 0)"
                          />
                          <path
                            d="M40 48H16V24C16 10.745 26.745 0 40 0h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-4-b)"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="64"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient
                            x1="0%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-5-a">
                            <stop
                              stopColor="#F9425F"
                              stopOpacity=".8"
                              offset="0%"
                            />
                            <stop
                              stopColor="#47A1F9"
                              stopOpacity=".16"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-5-b">
                            <stop stopColor="#FDFFDA" offset="0%" />
                            <stop
                              stopColor="#F97059"
                              stopOpacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stopColor="#F9425F"
                              stopOpacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M24 63H0V39c0-13.255 10.745-24 24-24h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-5-a)"
                            transform="matrix(-1 0 0 1 48 0)"
                          />
                          <path
                            d="M40 48H16V24C16 10.745 26.745 0 40 0h24v24c0 13.255-10.745 24-24 24"
                            fillOpacity=".24"
                            fill="url(#feature-5-a)"
                            transform="matrix(-1 0 0 1 80 0)"
                          />
                          <path
                            d="M10.113 10.113v22c0 12.15 9.85 22 22 22h22v-22c0-12.15-9.85-22-22-22h-22z"
                            fill="url(#feature-5-b)"
                            transform="rotate(45 32.113 32.113)"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <svg
                        width="64"
                        height="64"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient
                            x1="50%"
                            y1="100%"
                            x2="50%"
                            y2="0%"
                            id="feature-6-a">
                            <stop stopColor="#FDFFDA" offset="0%" />
                            <stop
                              stopColor="#F97059"
                              stopOpacity=".798"
                              offset="49.935%"
                            />
                            <stop
                              stopColor="#F9425F"
                              stopOpacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                          <linearGradient
                            x1="58.893%"
                            y1="100%"
                            x2="58.893%"
                            y2="18.531%"
                            id="feature-6-b">
                            <stop
                              stopColor="#F9425F"
                              stopOpacity=".8"
                              offset="0%"
                            />
                            <stop
                              stopColor="#47A1F9"
                              stopOpacity="0"
                              offset="100%"
                            />
                          </linearGradient>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M24 48H0V24C0 10.745 10.745 0 24 0h24v24c0 13.255-10.745 24-24 24"
                            fill="url(#feature-6-a)"
                          />
                          <path
                            fillOpacity=".64"
                            fill="url(#feature-6-b)"
                            d="M24 29.229h40V64H0z"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3 className="feature-title mt-24">Discover</h3>
                    <p className="text-sm mb-0">
                      A pseudo-Latin text used in web design, layout, and
                      printing in place of things to emphasise design.
                    </p>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </section>

    <section className="media section">
      <div className="container-sm">
        <div className="media-inner section-inner">
          <div className="media-header text-center">
            <h2 className="section-title mt-0">Meet VocaCoord</h2>
            <p className="section-paragraph mb-0">
              Personalized education is the way of the future. Watch the video
              below to get a small taste of it before it comes to a school near
              you this Fall.
            </p>
          </div>
          <div className="media-canvas">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=JVmCeAuSM4Y"
              width={800}
              height={450}
              style={{ position: 'relative' }}
            />
          </div>
        </div>
      </div>
    </section>
  </Scrollbar>
)

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default Home
