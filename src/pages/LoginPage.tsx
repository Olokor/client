import LoginForm from "../component/forms/LoginForm"
import SideHero from "../component/hero/SideHero"

export default function LoginPage() {
    return(
        <div className="flex h-screen">
        <div className="w-1/2">
            <SideHero/>
        </div>
        <div className="w-1/2">
            <LoginForm />   
        </div>
    </div>
    );
}