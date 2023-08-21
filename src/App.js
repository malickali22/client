
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx';
import CarInspect from './pages/CarInspection.jsx';
import CarRepair from './pages/CarRepair.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Navbar from './components/navbar/Navbar.jsx'
import Signup from './pages/Signup.jsx';
import Signin from './pages/Login.jsx';
import ServicesForm from './components/forms/ServicesForm.jsx'
import ContactForm from './components/forms/ContactForm.jsx'
import Footer from './components/footer/Footer.jsx';
import ForgetPass from './components/ForgetPassword/ForgetPass';
import CreateAd from './pages/Ads/createAd';
import EditAdForm from './pages/Ads/EditAdForm';
import DisplayAds from './pages/Ads/ads';
import MyAds from './pages/Ads/myads';
import Ad from './pages/Ads/ad'
import EmailVerify from "./components/EmailVerify/emailVerify";
import User from './pages/User';
import ChangePassword from './pages/ChangePassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import  UserProfile  from './pages/UserProfile';
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

function Layout({ children }) {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      {children}
      <Footer/>
      </QueryClientProvider>
    </>
  );
}

const App =()=> {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/car-repair" element={<Layout><CarRepair /></Layout>} />
        <Route path="/car-inspect" element={<Layout><CarInspect /></Layout>} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/service-form" element={<Layout><ServicesForm /></Layout>} />
        <Route path="/contact-form" element={<Layout><ContactForm /></Layout>} />
        <Route path="/create-ad" element={<Layout><CreateAd/></Layout>} />
        <Route path="/ads" element={<Layout><DisplayAds/></Layout>} />
        <Route path="/myads" element={<Layout><MyAds/></Layout>} />
        <Route path="/edit-ad/:id" element={<Layout><EditAdForm /></Layout>} />
        <Route path="/userprofile/:id" element={<Layout><UserProfile /></Layout>} />
        <Route path="/ad/:id" element={<Layout><Ad/></Layout>} />
        <Route path="/auth/:id/verify/:token" element={<EmailVerify/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/changepass" element={<ChangePassword/>} />
        <Route path="/auth/:id/:token" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;