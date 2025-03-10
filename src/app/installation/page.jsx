import React, { useEffect } from 'react';
import logo from '../../assets/logo.svg'
import { Github } from 'lucide-react';
import { Container } from '@/components';
import { useNavigate } from 'react-router-dom';
import dbService from '@/appwrite/db';
import { useSelector } from 'react-redux';

const Installation = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const installationID = queryParameters.get("installation_id")
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
      console.log(userData.targets[0].providerId, installationID);
      
      dbService.getGithubAppData(userData.targets[0].providerId)
      .then(isInstalled => {
        console.log(isInstalled);
        
      if (!isInstalled) {
        if (installationID && userData.targets[0].providerId) {
        dbService.storeGithubAppData(userData.targets[0].providerId, {installationID})
        .then(data => {
          if (data) {
            console.log(response);
            navigate("/dashboard")
          }
        })
      }
      } else {
        console.log(true);
        
          navigate("/dashboard")
      }
    })

    }, []);

    return (
      <Container>
        <div className="h-full bg-black text-white relative overflow-hidden flex justify-center items-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(51, 51, 51) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(51, 51, 51) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          opacity: 0.2,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-center">
            <img src={logo} alt="" srcset="" className="block mx-auto" />
            CodeChirp
          </h1>
          <p className="text-xl mb-12 text-gray-300">
            Install the CodeChirp GitHub App
          </p>

          <a
            href='https://github.com/apps/codechirp/installations/select_target'
            size="lg" className="mb-16 border-slate-500 hover:border-[1px] transition-all duration-200 bg-green-900 px-4 py-1 rounded-md">
            Install
          </a>

        </div>
      </div>

      {/* GitHub icon */}
      <div className="absolute bottom-8 right-8 text-gray-600">
        <Github className="w-12 h-12" />
      </div>
    </div>
    </Container>
    );
}

export default Installation;
