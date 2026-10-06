
import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";

import {
    Coins,
    Wallet,
    WalletCards,
    Mail
} from "lucide-react";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-transparent font-sans text-gray-800">

            {/* Header */}
            <Header />

            <main>

                {/* =========================
                    HERO SECTION
                ========================== */}
                <HeroSection />


                {/* =========================
                    PRODUCT SHOWCASE
                ========================== */}
                <ProductShowcase />


                {/* =========================
                    ABOUT US SECTION
                ========================== */}
                <section
                    id="about"
                    className="scroll-mt-20 bg-transparent py-24 px-6"
                >
                    <div className="max-w-6xl mx-auto">

                        {/* Heading */}
                        <div className="text-center">

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                About Us
                            </h2>

                            <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg leading-relaxed">
                                Manage Ur Expense is a simple and user-friendly
                                personal finance management application designed
                                to help users manage their income and expenses
                                in one place.
                            </p>

                        </div>


                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

                            {/* Income Management */}
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition">

                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5">
                                    <Wallet className="text-green-700" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900">
                                    Income Management
                                </h3>

                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Add and manage your income sources and keep
                                    track of the money you receive.
                                </p>

                            </div>


                            {/* Expense Tracking */}
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition">

                                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-5">
                                    <Coins className="text-red-700" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900">
                                    Expense Tracking
                                </h3>

                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Record your daily expenses and understand
                                    where your money is being spent.
                                </p>

                            </div>


                            {/* Financial Overview */}
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition">

                                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-5">
                                    <WalletCards className="text-purple-700" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900">
                                    Financial Overview
                                </h3>

                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Get a clear overview of your balance, income,
                                    expenses and recent transactions.
                                </p>

                            </div>

                        </div>


                        {/* Why Manage Ur Expense */}
                        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 md:p-10">

                            <h3 className="text-2xl font-semibold text-gray-900">
                                Why Manage Ur Expense?
                            </h3>

                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Managing personal finances can become difficult
                                when income and expenses are scattered across
                                different places. Manage Ur Expense brings
                                everything together in one simple dashboard,
                                helping users stay organized and understand
                                their financial position.
                            </p>

                        </div>

                    </div>
                </section>


                {/* =========================
                    CONTACT US SECTION
                ========================== */}
                <section
                    id="contact"
                    className="scroll-mt-20 bg-transparent py-24 px-6"
                >
                    <div className="max-w-4xl mx-auto text-center">

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Contact Us
                        </h2>

                        <p className="mt-5 text-gray-600 text-lg">
                            Have any questions or suggestions?
                            Feel free to connect with us.
                        </p>


                        {/* Contact Links */}
                        <div className="mt-12 flex flex-wrap justify-center gap-5">

                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/9547493130"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                            >
                                <span className="text-green-600 text-xl">
                                    📱
                                </span>

                                <span className="font-medium text-gray-700">
                                    WhatsApp
                                </span>
                            </a>


                            {/* Email */}
                            <a
                                href="mailto:asifahamed012345@gmail,com"
                                className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                            >
                                <Mail className="text-purple-600 w-5 h-5" />

                                <span className="font-medium text-gray-700">
                                    Email
                                </span>
                            </a>
                
                        </div>

                    </div>
                </section>


                {/* =========================
                    FOOTER
                ========================== */}
                <footer className="bg-gray-900 text-white py-8">

                    <div className="max-w-6xl mx-auto px-6">

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                            {/* Logo / Name */}
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Manage Ur Expense
                                </h3>

                                <p className="text-gray-400 text-sm mt-1">
                                    Simple and smart personal finance management.
                                </p>
                            </div>


                            {/* Footer Navigation */}
                            <div className="flex items-center gap-6 text-sm">

                                <a
                                    href="#home"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Home
                                </a>

                                <a
                                    href="#about"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    About Us
                                </a>

                                <a
                                    href="#contact"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Contact Us
                                </a>

                            </div>

                        </div>


                        {/* Copyright */}
                        

                    </div>

                </footer>

            </main>

        </div>
    );
};

export default LandingPage;