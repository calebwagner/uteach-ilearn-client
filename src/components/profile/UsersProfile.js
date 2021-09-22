import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider.js";
import { ConnectionContext } from "../connections/ConnectionProvider.js";
import { PostContext } from "../posts/PostProvider.js";
import { UserContext } from "../users/UserProviders.js";
import { ProfileContext } from "./ProfileProvider.js";

export const UsersProfileDetail = () => {
  const { profile, getProfile, getProfileById } = useContext(ProfileContext);
  const { posts, getPosts, getPostById } = useContext(PostContext);
  const { unaddConnection, addConnection, getConnections, connections } =
    useContext(ConnectionContext);
  const { users, getUsers } = useContext(UserContext);
  const { getAuthorById, author } = useContext(AuthorContext);
  const { authorId } = useParams();
  const history = useHistory();

  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    getConnections().then(() => {
      const alreadyConnected = connections.find((connected) => {
        return parseInt(authorId) === connected.profile.user.id;
      });
      if (alreadyConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, [isConnected]);

  const refreshPage = () => {
    window.location.reload();
  };

  const addAConnection = () => {
    addConnection({
      user: users.user?.id,
      profile: parseInt(authorId),
    }).then(refreshPage);
  };

  const alreadyConnected = connections.find((connected) => {
    return parseInt(authorId) === connected.profile.user.id;
  });

  const unaddAConnection = () => {
    unaddConnection(alreadyConnected.id).then(refreshPage);
  };

  useEffect(() => {
    getAuthorById(authorId);
  }, []);

  return (
    <article className="profile p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <header>
        <h1>
          Profile of {author?.user?.first_name} {author?.user?.last_name}
        </h1>
      </header>
      <section className="profile__info">
        <img
          className="h-48 w-16 object-scale-down md:w-48"
          //   src={post.user.image_url}
          //   src={require("./images/profilepic.jpg")}
          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          alt="profile picture"
        ></img>

        <div className="profile__username">
          {/* Username: {profile?.app_user?.user?.username} */}
        </div>
        <div className="profile__bio">About: {author?.bio}</div>
      </section>
      {isConnected ? (
        <button
          className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={unaddAConnection}
        >
          Unconnect
        </button>
      ) : (
        <button
          className="connect-btn m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={addAConnection}
        >
          Connect
        </button>
      )}
    </article>
  );
};
