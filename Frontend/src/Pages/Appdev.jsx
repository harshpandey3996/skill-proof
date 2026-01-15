import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppDevTask() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-black text-white">

        {/* HERO */}
        <div className="h-[30vh] flex flex-col justify-center items-center text-center px-6 border-b border-gray-800">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Mobile App Development
          </motion.h1>

          <p className="text-gray-400 max-w-4xl">
            App development focuses on building reliable, high-performance,
            and user-centric applications for mobile platforms that power
            daily life, businesses, and digital ecosystems.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/select-level", {
                state: { track: "appdev" },
              })
            }
            className="mt-6 bg-green-500 text-black px-10 py-3 rounded-full font-semibold"
          >
            Start App Dev Test
          </motion.button>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-28 space-y-32">

          {/* INTRO */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              What is Mobile App Development?
            </h2>
            <p className="text-gray-300 leading-loose">
              Mobile app development is the end-to-end process of designing,
              developing, testing, deploying, and maintaining applications
              that run on smartphones and tablets. Unlike traditional websites,
              mobile apps work closely with operating systems, device hardware,
              and platform-specific APIs. This deep integration allows apps to
              deliver rich user experiences, real-time notifications, offline
              functionality, and smooth animations.
              <br /><br />
              A professional app developer must understand far more than just
              writing screens. They must think about performance optimization,
              memory usage, battery efficiency, device fragmentation, screen
              density differences, accessibility, and platform design
              guidelines. Every decision — from navigation structure to API
              calls — directly impacts user retention and app ratings.
              <br /><br />
              Modern users expect apps to be fast, stable, intuitive, and
              secure. Even small performance issues or poor UX decisions can
              lead to uninstalls. That is why app development is both a
              technical discipline and a product-focused mindset.
            </p>
          </section>

          {/* PLATFORMS */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Mobile Platforms & Ecosystem
            </h2>
            <p className="text-gray-300 leading-loose">
              The mobile ecosystem is dominated by two platforms: Android and
              iOS. Android powers billions of devices worldwide, while iOS
              dominates premium markets. Each platform has its own operating
              system behavior, design language, and deployment rules.
              <br /><br />
              App developers must understand how apps interact with the OS,
              lifecycle events, background execution limits, permissions,
              notifications, storage systems, and security policies. Without
              this understanding, apps may crash, drain battery, or fail
              store reviews.
              <br /><br />
              Successful apps respect platform guidelines while still offering
              consistent brand experiences across devices. This balance
              separates amateur apps from professional-grade products.
            </p>
          </section>

          {/* FRAMEWORKS */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              App Development Frameworks
            </h2>
            <p className="text-gray-300 leading-loose">
              Modern app development is largely powered by cross-platform
              frameworks such as React Native and Flutter. These frameworks
              allow developers to write a single codebase that runs on both
              Android and iOS, dramatically reducing development time and cost.
              <br /><br />
              React Native uses JavaScript and React concepts to render native
              UI components, making it ideal for developers with frontend
              experience. Flutter, powered by Dart, offers high-performance
              rendering and precise UI control through its widget system.
              <br /><br />
              Regardless of framework choice, developers must understand
              navigation systems, component architecture, state management,
              asynchronous operations, API integration, and build pipelines.
              Frameworks change — fundamentals remain.
            </p>
          </section>

          {/* FEATURES */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Core App Features & Architecture
            </h2>
            <p className="text-gray-300 leading-loose">
              Real-world apps are not just screens connected together. They
              include authentication flows, form validation, API handling,
              offline caching, error handling, push notifications, analytics,
              and performance monitoring.
              <br /><br />
              App architecture plays a critical role in long-term scalability.
              Clean architecture, separation of concerns, and modular design
              allow teams to maintain and extend apps without breaking
              existing functionality.
              <br /><br />
              Developers who understand architecture patterns produce apps
              that survive growth, feature expansion, and real-world usage.
            </p>
          </section>

          {/* TESTING */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Testing, Performance & Deployment
            </h2>
            <p className="text-gray-300 leading-loose">
              Testing is essential in mobile app development due to the wide
              range of devices, OS versions, and user behaviors. Unit tests,
              integration tests, and manual testing help ensure stability.
              <br /><br />
              Performance optimization includes reducing app size, minimizing
              API calls, optimizing images, and ensuring smooth animations.
              Poor performance directly impacts user reviews and store rankings.
              <br /><br />
              Deployment involves publishing apps to Google Play Store and
              Apple App Store, following strict review guidelines, versioning,
              and update cycles.
            </p>
          </section>

          {/* CAREER */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              App Development as a Career
            </h2>
            <p className="text-gray-300 leading-loose">
              Mobile app developers are in high demand across startups,
              enterprises, fintech, healthcare, e-commerce, and SaaS
              companies. Businesses rely on mobile apps as primary customer
              touchpoints.
              <br /><br />
              Employers value developers who can build, debug, and deploy
              production-ready apps — not those who only understand theory.
              Real execution, problem-solving ability, and user-centric
              thinking matter most.
              <br /><br />
              SkillProof evaluates developers based on practical capability.
              If you can build a working app that solves a real problem, you
              already stand ahead of the majority of candidates.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
