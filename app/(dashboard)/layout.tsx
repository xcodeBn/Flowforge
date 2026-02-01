import React from 'react'

function Layout({children} : {children: React.ReactNode}) {
    return (<div className={"flex h-screen"}>
            <div className={"flex flex-col flex-1 min-h-screen"}>
                <header className={"flex items-start justify-between px-6 py-4 h-12.5 container "}>
                    FlowForge
                </header>
            </div>
        </div>
    )
}

export default Layout
