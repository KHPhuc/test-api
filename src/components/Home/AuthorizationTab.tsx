import {
  setAuth,
  setAuthBearer,
  setAuthCustom,
  setAuthType,
  setPassword,
  setUsername,
} from "@/store/authorization/authorization";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Card, Input, Radio } from "antd";
import { useEffect, useState } from "react";

export default function AuthorizationTab() {
  const dispatch = useAppDispatch();

  const authType = useAppSelector((state) => state.authorization.authType);
  const authBearer = useAppSelector((state) => state.authorization.authBearer);
  const username = useAppSelector((state) => state.authorization.username);
  const password = useAppSelector((state) => state.authorization.password);
  const authCustom = useAppSelector((state) => state.authorization.authCustom);

  useEffect(() => {
    switch (authType) {
      case "BearerToken":
        dispatch(setAuth(authBearer));
        break;
      case "BasicAuth":
        dispatch(setAuth(btoa(username + ":" + password)));
        break;
      case "Custom":
        dispatch(setAuth(authCustom));
        break;
      default:
        break;
    }
  }, [authBearer, username, password, authCustom, authType]);

  return (
    <div className="flex flex-col">
      <Radio.Group
        className="mb-3 flex gap-3 text-[1rem]"
        value={authType}
        onChange={(e) => dispatch(setAuthType(e.target.value))}
      >
        <Radio value={"BearerToken"}>Bearer Token</Radio>
        <Radio value={"BasicAuth"}>BasicAuth</Radio>
        <Radio value={"Custom"}>Custom</Radio>
        <Radio value={"NoAuth"}>No Auth</Radio>
      </Radio.Group>
      <Card className="h-[250px] box-border">
        <div className="flex flex-col">
          {authType === "BearerToken" ? (
            <div className="flex mb-[16px]">
              <label
                htmlFor="bearerTokenValue"
                className="w-[120px] m-0 py-[7px] pr-[15px] leading-[1.5] text-[16px]"
              >
                Token
              </label>
              <Input
                id="bearerTokenValue"
                className="px-[15px]"
                size="large"
                defaultValue={authBearer}
                onChange={(e) => dispatch(setAuthBearer(e.target.value))}
              />
            </div>
          ) : authType === "BasicAuth" ? (
            <>
              <div className="flex mb-[16px]">
                <label
                  htmlFor="username"
                  className="w-[120px] m-0 py-[7px] pr-[15px] leading-[1.5] text-[16px]"
                >
                  Username
                </label>
                <Input
                  id="username"
                  className="px-[15px]"
                  size="large"
                  defaultValue={username}
                  onChange={(e) => dispatch(setUsername(e.target.value))}
                />
              </div>
              <div className="flex mb-[16px]">
                <label
                  htmlFor="password"
                  className="w-[120px] m-0 py-[7px] pr-[15px] leading-[1.5] text-[16px]"
                >
                  Password
                </label>
                <Input.Password
                  id="password"
                  className="px-[15px]"
                  size="large"
                  defaultValue={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                />
              </div>
            </>
          ) : authType === "Custom" ? (
            <div className="flex mb-[16px]">
              <label
                htmlFor="header"
                className="w-[120px] m-0 py-[7px] pr-[15px] leading-[1.5] text-[16px]"
              >
                Header
              </label>
              <Input
                id="header"
                className="px-[15px]"
                size="large"
                defaultValue={authCustom}
                onChange={(e) => dispatch(setAuthCustom(e.target.value))}
              />
            </div>
          ) : (
            ""
          )}
          {authType === "NoAuth" ? (
            <div className="text-[16px]">
              No authorization data will be sent with this request.
            </div>
          ) : (
            <div className="flex">
              <div className="w-[120px]"></div>
              <p className="m-0 px-[15px] text-[12px]">
                The authorization header will be automatically generated when
                you send the request. Read more about HTTP Authentication.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
