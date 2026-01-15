import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CyberSecurityTask() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-black text-white">

        {/* HERO */}
        <div className="h-[30vh] flex flex-col justify-center items-center text-center px-6 border-b border-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cyber Security
          </h1>
          <p className="text-gray-400 max-w-3xl mb-6">
            Security is not a feature. It is a mindset.
          </p>

          {/* START TEST BUTTON */}
          <button
           onClick={() =>
              navigate("/select-level", {
                state: { track: "cyber" },
              })
            }
            className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Start Test
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-28 space-y-28">

          {/* INTRO */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Understanding Cyber Security
            </h2>
            <p className="text-gray-300 leading-loose">
              Cyber security is the practice of protecting digital systems,
              networks, programs, and data from unauthorized access, damage,
              or disruption. In the modern digital era, every organization,
              from startups to governments, relies on interconnected systems
              that must be secured against evolving threats.
              <br /><br />
              A cyber security professional does not think like a normal user.
              They think like an attacker. This mindset allows them to predict
              vulnerabilities before they are exploited. Ethical security work
              is based on responsibility, legality, and controlled testing.
            </p>
          </section>

          {/* THREATS */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Cyber Threat Landscape
            </h2>
            <p className="text-gray-300 leading-loose">
              Cyber threats evolve constantly. Attackers exploit software bugs,
              misconfigurations, weak passwords, and human errors. Threat actors
              range from individual hackers to organized crime groups and
              nation-state attackers.
              <br /><br />
              Common threats include malware, ransomware, phishing attacks,
              denial-of-service attacks, insider threats, and zero-day exploits.
              Understanding how these attacks work is essential for building
              strong defensive strategies.
            </p>
          </section>

          {/* DOMAINS */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Domains of Cyber Security
            </h2>
            <p className="text-gray-300 leading-loose">
              Cyber security is not a single skill but a collection of multiple
              specialized domains. Each domain focuses on a different layer
              of protection within an organization.
            </p>

            <ul className="list-disc list-inside text-gray-400 mt-6 space-y-3">
              <li>Network Security – protecting data in transit</li>
              <li>Application Security – securing software and APIs</li>
              <li>Cloud Security – protecting cloud infrastructure</li>
              <li>Endpoint Security – securing user devices</li>
              <li>Identity & Access Management (IAM)</li>
              <li>Security Operations (SOC)</li>
            </ul>
          </section>

          {/* NETWORK */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Network & Infrastructure Security
            </h2>
            <p className="text-gray-300 leading-loose">
              Network security focuses on protecting internal networks from
              unauthorized access. This includes firewalls, intrusion detection
              systems, intrusion prevention systems, VPNs, and segmentation.
              <br /><br />
              A secure network design follows the principle of least privilege
              and zero trust architecture. No device or user is trusted by
              default, regardless of location.
            </p>
          </section>

          {/* APP SEC */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Application Security
            </h2>
            <p className="text-gray-300 leading-loose">
              Modern applications are frequent attack targets due to exposed
              APIs and rapid development cycles. Application security focuses
              on identifying vulnerabilities such as SQL injection, cross-site
              scripting (XSS), CSRF, authentication flaws, and insecure deserialization.
              <br /><br />
              Secure coding practices, code reviews, penetration testing,
              and vulnerability scanning are essential parts of application security.
            </p>
          </section>

          {/* CRYPTO */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Cryptography & Data Protection
            </h2>
            <p className="text-gray-300 leading-loose">
              Cryptography ensures confidentiality, integrity, and authenticity
              of data. Encryption protects sensitive information from being read
              by unauthorized parties.
              <br /><br />
              Security professionals must understand hashing, symmetric and
              asymmetric encryption, digital signatures, certificates, and
              key management to design secure systems.
            </p>
          </section>

          {/* SOC */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Security Operations & Incident Response
            </h2>
            <p className="text-gray-300 leading-loose">
              Security Operations Centers (SOC) monitor systems continuously
              for suspicious activities. When an incident occurs, rapid
              detection and response minimize damage.
              <br /><br />
              Incident response involves identification, containment,
              eradication, recovery, and post-incident analysis.
            </p>
          </section>

          {/* ETHICS */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Ethics & Responsibility
            </h2>
            <p className="text-gray-300 leading-loose">
              Ethical hacking is legal hacking performed with permission.
              Without ethics, cyber security becomes cyber crime.
              <br /><br />
              Professionals must follow laws, disclosure policies,
              and organizational guidelines to protect users and systems responsibly.
            </p>
          </section>

          {/* CAREER */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Career in Cyber Security
            </h2>
            <p className="text-gray-300 leading-loose">
              Cyber security careers include roles such as Security Analyst,
              Penetration Tester, SOC Analyst, Cloud Security Engineer,
              and Security Architect.
              <br /><br />
              Employers value practical understanding, analytical thinking,
              and the ability to communicate risks clearly — not just tools or certificates.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
