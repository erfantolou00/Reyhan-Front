import promptText from "./promptText.json"
const Page = () => {
    return (
        <div>
            {JSON.stringify(promptText)}
        </div>
    );
}

export default Page;
