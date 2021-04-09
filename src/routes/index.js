/*
 * @Description: 路由
 * @Date: 2021-02-23 11:52:38
 * @LastEditTime: 2021-04-09 14:08:52
 */
import React from 'react';
import { Redirect } from "react-router-dom";
import Home from 'application/Home';
import Recommend from 'application/Recommend';
import Singers from 'application/Singers';
import Rank from 'application/Rank';
import Album from 'application/Album';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank,
        key:'rank',
        routes: [
          {
            path:'/rank/:id',
            component: Album
          }
        ]
      }
    ]
  }
]