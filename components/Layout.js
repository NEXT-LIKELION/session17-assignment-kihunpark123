import Link from "next/link";

export default function Layout({ children }) {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <header
                style={{
                    backgroundColor: "white",
                    padding: "20px 0",
                    borderBottom: "1px solid #ddd",
                }}
            >
                <nav
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "0 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            textDecoration: "none",
                            color: "#2d3436",
                        }}
                    >
                        날씨 블로그
                    </Link>
                    <div>
                        <Link
                            href="/"
                            style={{
                                marginRight: "20px",
                                textDecoration: "none",
                                color: "#636e72",
                            }}
                        >
                            홈
                        </Link>
                        <Link
                            href="/write"
                            style={{
                                textDecoration: "none",
                                color: "#636e72",
                            }}
                        >
                            글쓰기
                        </Link>
                    </div>
                </nav>
            </header>

            <main
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px 20px",
                }}
            >
                {children}
            </main>
        </div>
    );
}
