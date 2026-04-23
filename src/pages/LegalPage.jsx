import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ArrowLeft } from 'lucide-react'

const legalContent = {
    'terms': {
        title: 'Terms and Conditions',
        lastUpdated: 'April 17, 2026',
        content: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using GlobalPathways AI ("the Platform"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>

      <h2>2. Description of Service</h2>
      <p>GlobalPathways provides AI-powered career and relocation intelligence services, including personalized pathway recommendations, country data analysis, financial modeling (ROI/NPV calculations), and career guidance based on user-provided information.</p>

      <h2>3. User Accounts</h2>
      <p>You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your responsibility. You must provide accurate and complete information during registration and keep your profile updated.</p>

      <h2>4. Data Usage</h2>
      <p>We collect and process your personal information, including but not limited to:
      <ul>
        <li>Profile information (name, email, location)</li>
        <li>Educational and professional background</li>
        <li>Financial information (savings, loan capacity)</li>
        <li>Preferences and lifestyle choices</li>
        <li>Resume and skills data</li>
      </ul>
      This data is used exclusively to provide personalized recommendations and improve our services.</p>

      <h2>5. Accuracy of Information</h2>
      <p>While we strive to provide accurate and up-to-date information, GlobalPathways does not guarantee the completeness, reliability, or accuracy of pathway recommendations, country data, or financial calculations. All results are for guidance purposes only and should not be considered as professional financial, legal, or immigration advice.</p>

      <h2>6. Intellectual Property</h2>
      <p>All content, features, and functionality of the Platform, including but not limited to text, graphics, logos, algorithms, and software, are the exclusive property of GlobalPathways AI and are protected by intellectual property laws.</p>

      <h2>7. Limitation of Liability</h2>
      <p>GlobalPathways shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform, including but not limited to decisions made based on our recommendations, relocation outcomes, or career choices.</p>

      <h2>8. Third-Party Links</h2>
      <p>The Platform may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites. You access these links at your own risk.</p>

      <h2>9. Termination</h2>
      <p>We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or the Platform.</p>

      <h2>10. Changes to Terms</h2>
      <p>We may modify these Terms at any time. We will notify users of significant changes via email or Platform notifications. Your continued use of the Platform after changes constitutes acceptance of the updated Terms.</p>

      <h2>11. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.</p>

      <h2>12. Contact Information</h2>
      <p>For questions about these Terms, please contact us at legal@globalpathways.ai</p>
    `
    },
    'privacy': {
        title: 'Privacy Policy',
        lastUpdated: 'April 17, 2026',
        content: `
      <h2>1. Information We Collect</h2>
      <p>We collect the following types of information:
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, country of residence</li>
        <li><strong>Professional Data:</strong> Resume, skills, educational background, work experience, career preferences</li>
        <li><strong>Financial Data:</strong> Savings ranges, loan capacity, financial goals (all approximate, not exact figures)</li>
        <li><strong>Preferences:</strong> Country preferences, lifestyle choices, priorities, risk tolerance</li>
        <li><strong>Usage Data:</strong> How you interact with the Platform, pages visited, features used</li>
      </ul>
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>Your information is used to:
      <ul>
        <li>Generate personalized career and relocation pathway recommendations</li>
        <li>Calculate financial projections (ROI, NPV)</li>
        <li>Improve our AI models and recommendation algorithms</li>
        <li>Communicate with you about your account and Platform updates</li>
        <li>Provide customer support</li>
        <li>Analyze usage patterns to enhance user experience</li>
      </ul>
      </p>

      <h2>3. Data Sharing</h2>
      <p>We do NOT sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for research purposes. We may disclose your information if required by law or to protect our rights.</p>

      <h2>4. Data Security</h2>
      <p>We implement industry-standard security measures to protect your data, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

      <h2>5. Data Retention</h2>
      <p>We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting privacy@globalpathways.ai. We will comply with deletion requests within 30 days, subject to legal obligations.</p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate or incomplete data</li>
        <li>Request deletion of your data</li>
        <li>Export your data in a portable format</li>
        <li>Opt out of marketing communications</li>
        <li>Withdraw consent for data processing</li>
      </ul>
      </p>

      <h2>7. Cookies and Tracking</h2>
      <p>We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can control cookie preferences through your browser settings.</p>

      <h2>8. Children's Privacy</h2>
      <p>Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.</p>

      <h2>9. International Data Transfers</h2>
      <p>Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place for such transfers.</p>

      <h2>10. Changes to Privacy Policy</h2>
      <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or Platform notifications.</p>

      <h2>11. Contact Us</h2>
      <p>For privacy-related inquiries, contact: privacy@globalpathways.ai</p>
    `
    },
    'agreement': {
        title: 'User Agreement',
        lastUpdated: 'April 17, 2026',
        content: `
      <h2>1. Agreement Overview</h2>
      <p>This User Agreement ("Agreement") governs your use of GlobalPathways AI services. By creating an account or using our Platform, you enter into a binding agreement with GlobalPathways.</p>

      <h2>2. Service Description</h2>
      <p>GlobalPathways provides AI-powered career intelligence and relocation guidance. Our services include:
      <ul>
        <li>Personalized pathway recommendations based on your profile</li>
        <li>Financial modeling (ROI and NPV calculations)</li>
        <li>Country and visa information</li>
        <li>Career transition guidance</li>
        <li>Skills matching and transferability analysis</li>
      </ul>
      </p>

      <h2>3. User Obligations</h2>
      <p>You agree to:
      <ul>
        <li>Provide accurate, current, and complete information</li>
        <li>Update your information as necessary</li>
        <li>Use the Platform for lawful purposes only</li>
        <li>Not misrepresent your qualifications or background</li>
        <li>Not use the Platform to spam, harass, or harm others</li>
        <li>Not attempt to reverse-engineer or exploit the Platform</li>
      </ul>
      </p>

      <h2>4. Nature of Recommendations</h2>
      <p>All recommendations, rankings, and financial projections provided by GlobalPathways are for informational and guidance purposes only. They do not constitute:
      <ul>
        <li>Financial advice</li>
        <li>Legal or immigration advice</li>
        <li>Guarantees of employment or admission</li>
        <li>Professional career counseling</li>
      </ul>
      You should consult qualified professionals before making major life decisions.</p>

      <h2>5. Premium Features</h2>
      <p>Certain features may require authentication or payment. Premium features are subject to separate terms and pricing, which will be clearly communicated before purchase.</p>

      <h2>6. Disclaimers</h2>
      <p>The Platform is provided "as is" without warranties of any kind. We do not guarantee:
      <ul>
        <li>Accuracy of country data, salary information, or visa requirements</li>
        <li>Success of applications or career transitions</li>
        <li>Continuous, uninterrupted service</li>
        <li>Specific outcomes from following our recommendations</li>
      </ul>
      </p>

      <h2>7. User Content</h2>
      <p>You retain ownership of content you upload (e.g., resumes). By uploading, you grant us a license to process and analyze the content solely to provide our services.</p>

      <h2>8. Account Termination</h2>
      <p>You may delete your account at any time. We may suspend or terminate accounts that violate this Agreement or engage in harmful activities.</p>

      <h2>9. Dispute Resolution</h2>
      <p>Any disputes shall first be addressed through good-faith negotiations. If unresolved, disputes will be settled through arbitration in accordance with applicable laws.</p>

      <h2>10. Contact</h2>
      <p>For agreement-related questions: legal@globalpathways.ai</p>
    `
    }
}

export default function LegalPage() {
    const navigate = useNavigate()
    const { page } = useParams()
    const content = legalContent[page]

    if (!content) {
        return (
            <div className="min-h-screen bg-white font-body">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <h1 className="font-display text-3xl font-bold text-navy-900 mb-4">Page Not Found</h1>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        Return Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white font-body">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-20">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-800 mb-8 font-body transition-colors"
                >
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="mb-8">
                    <h1 className="font-display text-4xl font-bold text-navy-900 mb-2">{content.title}</h1>
                    <p className="text-sm text-navy-400 font-body">Last updated: {content.lastUpdated}</p>
                </div>

                <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: content.content }}
                    style={{
                        lineHeight: '1.8',
                        color: '#0f265a'
                    }}
                />

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-navy-500 font-body">
                        If you have any questions about this document, please contact us at{' '}
                        <a href="mailto:legal@globalpathways.ai" className="text-navy-700 underline">
                            legal@globalpathways.ai
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
