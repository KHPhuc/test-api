import { Radio } from "antd";

export default function AuthorizationTab() {
    return <div className="flex flex-col">
        <Radio.Group className="mb-3 flex gap-[5px]">
            <Radio value={"BearerToken"}>Bearer Token</Radio>
            <Radio value={"BasicAuth"}>BasicAuth</Radio>
            <Radio value={"Custom"}>Custom</Radio>
            <Radio value={"NoAuth"}>No Auth</Radio>
        </Radio.Group>
    </div>
}