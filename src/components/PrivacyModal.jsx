import { X } from 'lucide-react'

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#141B2D] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-[#141B2D] border-b border-gray-100 dark:border-white/5 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Privacy Policy</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-5">
          <p className="text-xs text-gray-400 dark:text-gray-500">Last updated: April 5, 2026</p>

          <section>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">1. Information We Collect</h3>
            <p>When you use LaunchPlan AI, we collect the following information:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Account information:</strong> Your email address, name, and profile picture when you sign up via Google OAuth or email.</li>
              <li><strong>Product data:</strong> The product details you enter into the plan generator (product name, description, target audience, channels, budget, and goals).</li>
              <li><strong>Generated plans:</strong> The AI-generated marketing plans are stored in your account so you can revisit them.</li>
              <li><strong>Usage data:</strong> Basic analytics such as page views and feature usage to improve the product.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">2. How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>To generate personalized marketing plans based on your input.</li>
              <li>To save and display your plan history.</li>
              <li>To improve our AI models and product experience.</li>
              <li>To communicate important updates about the service.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">3. Data Storage & Security</h3>
            <p>Your data is stored securely using Supabase, which provides enterprise-grade security with row-level access controls. Your plans are only accessible to your account. We do not sell or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">4. Third-Party Services</h3>
            <p>We use the following third-party services to operate LaunchPlan AI:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Supabase:</strong> Authentication and database storage.</li>
              <li><strong>Groq:</strong> AI inference for generating marketing plans.</li>
              <li><strong>Google OAuth:</strong> Optional sign-in provider.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">5. Your Rights</h3>
            <p>You can delete your saved plans at any time from the "My Plans" panel. If you wish to delete your account and all associated data, please contact us and we will process your request promptly.</p>
          </section>

          <section>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">6. Cookies</h3>
            <p>We use essential cookies for authentication and session management. We do not use third-party advertising cookies.</p>
          </section>

          <section>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">7. Contact</h3>
            <p>If you have questions about this privacy policy, please reach out to us on Twitter or via our support channels.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
