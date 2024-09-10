// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import io, { Socket } from "socket.io-client";

// interface VideoCallRoomProps {
//   roomID: string;
// }

// interface PeerConnections {
//   [userID: string]: RTCPeerConnection;
// }

// const VideoCallRoom: React.FC<VideoCallRoomProps> = () => {
//   const { roomID } = useParams<{ roomID: string }>();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [peers, setPeers] = useState<MediaStream[]>([]);
//   const localVideoRef = useRef<HTMLVideoElement | null>(null);
//   const peerConnections = useRef<PeerConnections>({});

//   useEffect(() => {
//     const newSocket = io("http://localhost:3000");
//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     newSocket.on("disconnect", () => {
//       console.log("Disconnected from server");
//     });

//     newSocket.emit("join-room", roomID, "66de6c6819029cc4b2bbdecb");

//     newSocket.on("user-connected", handleUserConnected);
//     newSocket.on("user-disconnected", handleUserDisconnected);
//     newSocket.on("offer", handleOffer);
//     newSocket.on("answer", handleAnswer);
//     newSocket.on("ice-candidate", handleIceCandidate);

//     return () => {
//       newSocket.disconnect();
//       // Clean up peer connections and streams
//       Object.values(peerConnections.current).forEach((peerConnection) =>
//         peerConnection.close()
//       );
//       setPeers([]);
//     };
//   }, [roomID]);

//   const handleUserConnected = async (userID: string) => {
//     const peerConnection = createPeerConnection(userID);
//     peerConnections.current[userID] = peerConnection;

//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       }

//       localStream
//         .getTracks()
//         .forEach((track) => peerConnection.addTrack(track, localStream));

//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);
//       socket?.emit("offer", roomID, userID, offer);
//     } catch (error) {
//       console.error("Error accessing media devices.", error);
//     }
//   };

//   const handleUserDisconnected = (userID: string) => {
//     if (peerConnections.current[userID]) {
//       peerConnections.current[userID].close();
//       delete peerConnections.current[userID];
//       setPeers((prevPeers) => prevPeers.filter((peer) => peer.id !== userID));
//     }
//   };

//   const createPeerConnection = (userID: string): RTCPeerConnection => {
//     const peerConnection = new RTCPeerConnection();

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket?.emit("ice-candidate", roomID, userID, event.candidate);
//       }
//     };

//     peerConnection.ontrack = (event) => {
//       setPeers((prevPeers) => {
//         const existingPeer = prevPeers.find((peer) => peer.id === userID);
//         if (existingPeer) return prevPeers;

//         return [...prevPeers, event.streams[0]];
//       });
//     };

//     return peerConnection;
//   };

//   const handleOffer = async (
//     userID: string,
//     offer: RTCSessionDescriptionInit
//   ) => {
//     const peerConnection = createPeerConnection(userID);
//     peerConnections.current[userID] = peerConnection;

//     try {
//       await peerConnection.setRemoteDescription(
//         new RTCSessionDescription(offer)
//       );
//       const answer = await peerConnection.createAnswer();
//       await peerConnection.setLocalDescription(answer);
//       socket?.emit("answer", roomID, userID, answer);
//     } catch (error) {
//       console.error("Error handling offer.", error);
//     }
//   };

//   const handleAnswer = async (
//     userID: string,
//     answer: RTCSessionDescriptionInit
//   ) => {
//     if (peerConnections.current[userID]) {
//       try {
//         await peerConnections.current[userID].setRemoteDescription(
//           new RTCSessionDescription(answer)
//         );
//       } catch (error) {
//         console.error("Error handling answer.", error);
//       }
//     }
//   };

//   const handleIceCandidate = async (
//     userID: string,
//     candidate: RTCIceCandidateInit
//   ) => {
//     if (peerConnections.current[userID]) {
//       try {
//         await peerConnections.current[userID].addIceCandidate(
//           new RTCIceCandidate(candidate)
//         );
//       } catch (error) {
//         console.error("Error handling ICE candidate.", error);
//       }
//     }
//   };

//   return (
//     <div className="video-call-room grid grid-cols-2 gap-4 p-4">
//       <div className="local-video w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
//         <video
//           ref={localVideoRef}
//           className="w-full h-full object-cover"
//           autoPlay
//           playsInline
//           muted
//         />
//       </div>

//       {peers.map((peer, index) => (
//         <div
//           key={index}
//           className="remote-video w-full h-64 bg-gray-800 rounded-lg overflow-hidden"
//         >
//           <video
//             className="w-full h-full object-cover"
//             autoPlay
//             playsInline
//             srcObject={peer}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoCallRoom;
// const [roomId, setRoomId] = useState<string>("66dd316e8df58bc214ff6797");
// src/VideoChat.tsx
// src/VideoChat.tsx

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

// const VideoCallRoom: React.FC = () => {
//   const [roomId, setRoomId] = useState<string>("66dd316e8df58bc214ff6797");
//   const [peerConnections, setPeerConnections] = useState<
//     Map<string, RTCPeerConnection>
//   >(new Map());
//   const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(
//     new Map()
//   );
//   const [userList, setUserList] = useState<string[]>([]);
//   console.log("🚀 ~ userList:", userList);
//   const localVideoRef = useRef<HTMLVideoElement>(null);

//   console.log("🚀 ~ remoteStreams:", remoteStreams);
//   useEffect(() => {
//     const constraints = {
//       video: true,
//       audio: true,
//     };

//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }

//       socket.emit("create-room", roomId);

//       socket.on("user-list", (users: string[]) => {
//         setUserList(users);
//       });

//       socket.on("user-joined", (userId: string) => {
//         const peerConnection = new RTCPeerConnection();

//         peerConnection.addStream(stream);

//         peerConnection.ontrack = (event) => {
//           setRemoteStreams((prev) =>
//             new Map(prev).set(userId, event.streams[0])
//           );
//         };

//         peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
//           if (event.candidate) {
//             socket.emit("ice-candidate", {
//               to: userId,
//               candidate: event.candidate,
//             });
//           }
//         };

//         peerConnection.createOffer().then((offer) => {
//           peerConnection.setLocalDescription(new RTCSessionDescription(offer));
//           socket.emit("offer", { to: userId, offer });
//         });

//         setPeerConnections((prev) => new Map(prev).set(userId, peerConnection));
//       });

//       socket.on(
//         "offer",
//         ({
//           from,
//           offer,
//         }: {
//           from: string;
//           offer: RTCSessionDescriptionInit;
//         }) => {
//           const peerConnection = new RTCPeerConnection();
//           peerConnection.addStream(stream);

//           peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//           peerConnection.createAnswer().then((answer) => {
//             peerConnection.setLocalDescription(
//               new RTCSessionDescription(answer)
//             );
//             socket.emit("answer", { to: from, answer });
//           });

//           peerConnection.ontrack = (event) => {
//             setRemoteStreams((prev) =>
//               new Map(prev).set(from, event.streams[0])
//             );
//           };

//           peerConnection.onicecandidate = (
//             event: RTCPeerConnectionIceEvent
//           ) => {
//             if (event.candidate) {
//               socket.emit("ice-candidate", {
//                 to: from,
//                 candidate: event.candidate,
//               });
//             }
//           };

//           setPeerConnections((prev) => new Map(prev).set(from, peerConnection));
//         }
//       );

//       socket.on(
//         "answer",
//         ({
//           from,
//           answer,
//         }: {
//           from: string;
//           answer: RTCSessionDescriptionInit;
//         }) => {
//           const peerConnection = peerConnections.get(from);
//           if (peerConnection) {
//             peerConnection.setRemoteDescription(
//               new RTCSessionDescription(answer)
//             );
//           }
//         }
//       );

//       socket.on(
//         "ice-candidate",
//         ({
//           from,
//           candidate,
//         }: {
//           from: string;
//           candidate: RTCIceCandidateInit;
//         }) => {
//           const peerConnection = peerConnections.get(from);
//           if (peerConnection) {
//             peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//           }
//         }
//       );

//       socket.on("user-disconnected", (userId: string) => {
//         setRemoteStreams((prev) => {
//           const newStreams = new Map(prev);
//           newStreams.delete(userId);
//           return newStreams;
//         });
//         setPeerConnections((prev) => {
//           const newConnections = new Map(prev);
//           const peerConnection = newConnections.get(userId);
//           peerConnection?.close();
//           newConnections.delete(userId);
//           return newConnections;
//         });
//       });
//     });

//     return () => {
//       socket.off("user-list");
//       socket.off("user-joined");
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       socket.off("user-disconnected");
//     };
//   }, [peerConnections]);

//   //   const createRoom = () => {
//   //     socket.emit("create-room", roomId);
//   //   };

//   //   const joinRoom = () => {
//   //     socket.emit("join-room", roomId);
//   //   };

//   return (
//     <div>
//       <h1>Video Chat</h1>
//       <input
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         placeholder="Room ID"
//       />
//       {/* <button onClick={createRoom}>Create Room</button>
//       <button onClick={joinRoom}>Join Room</button> */}
//       <div>
//         <h2>Local Video</h2>
//         <video ref={localVideoRef} autoPlay muted />
//       </div>
//       <div>
//         <h2>Connected Users</h2>
//         <ul>
//           {userList.map((userId) => (
//             <li key={userId}>User {userId}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         {Array.from(remoteStreams.entries()).map(([userId, stream]) => (
//           <div key={userId}>
//             <h2>User {userId}</h2>
//             <video
//               id={`remote-video-${userId}`} // Gán id để dễ truy cập thẻ video
//               autoPlay
//               playsInline
//               controls={false} // Ẩn điều khiển để video tự phát
//               muted={userId === "local"} // Tắt tiếng nếu là video cục bộ
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoCallRoom;

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

// const VideoCallRoom: React.FC = () => {
//   const [roomId, setRoomId] = useState<string>("66dd316e8df58bc214ff6797");
//   const [peerConnections, setPeerConnections] = useState<
//     Map<string, RTCPeerConnection>
//   >(new Map());
//   const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(
//     new Map()
//   );
//   const [userList, setUserList] = useState<string[]>([]);
//   const localVideoRef = useRef<HTMLVideoElement>(null);

//   console.log("🚀 ~ remoteStreams:", Array.from(remoteStreams.entries()));
//   useEffect(() => {
//     const constraints = {
//       video: true,
//       audio: true,
//     };

//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then((stream) => {
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         socket.emit("create-room", roomId);

//         socket.on("user-list", (users: string[]) => {
//           setUserList(users);
//         });

//         socket.on("user-joined", (userId: string) => {
//           const peerConnection = new RTCPeerConnection();

//           stream
//             .getTracks()
//             .forEach((track) => peerConnection.addTrack(track, stream));

//           peerConnection.ontrack = (event) => {
//             setRemoteStreams((prev) => {
//               const newStreams = new Map(prev);
//               newStreams.set(userId, event.streams[0]);
//               return newStreams;
//             });
//           };

//           peerConnection.onicecandidate = (
//             event: RTCPeerConnectionIceEvent
//           ) => {
//             if (event.candidate) {
//               socket.emit("ice-candidate", {
//                 to: userId,
//                 candidate: event.candidate,
//               });
//             }
//           };

//           peerConnection
//             .createOffer()
//             .then((offer) => {
//               return peerConnection.setLocalDescription(
//                 new RTCSessionDescription(offer)
//               );
//             })
//             .then(() => {
//               socket.emit("offer", {
//                 to: userId,
//                 offer: peerConnection.localDescription,
//               });
//             });

//           setPeerConnections((prev) =>
//             new Map(prev).set(userId, peerConnection)
//           );
//         });

//         socket.on(
//           "offer",
//           ({
//             from,
//             offer,
//           }: {
//             from: string;
//             offer: RTCSessionDescriptionInit;
//           }) => {
//             const peerConnection = new RTCPeerConnection();

//             stream
//               .getTracks()
//               .forEach((track) => peerConnection.addTrack(track, stream));

//             peerConnection
//               .setRemoteDescription(new RTCSessionDescription(offer))
//               .then(() => {
//                 return peerConnection.createAnswer();
//               })
//               .then((answer) => {
//                 return peerConnection.setLocalDescription(
//                   new RTCSessionDescription(answer)
//                 );
//               })
//               .then(() => {
//                 socket.emit("answer", {
//                   to: from,
//                   answer: peerConnection.localDescription,
//                 });
//               });

//             peerConnection.ontrack = (event) => {
//               setRemoteStreams((prev) => {
//                 const newStreams = new Map(prev);
//                 newStreams.set(from, event.streams[0]);
//                 return newStreams;
//               });
//             };

//             peerConnection.onicecandidate = (
//               event: RTCPeerConnectionIceEvent
//             ) => {
//               if (event.candidate) {
//                 socket.emit("ice-candidate", {
//                   to: from,
//                   candidate: event.candidate,
//                 });
//               }
//             };

//             setPeerConnections((prev) =>
//               new Map(prev).set(from, peerConnection)
//             );
//           }
//         );

//         socket.on(
//           "answer",
//           ({
//             from,
//             answer,
//           }: {
//             from: string;
//             answer: RTCSessionDescriptionInit;
//           }) => {
//             const peerConnection = peerConnections.get(from);
//             if (peerConnection) {
//               peerConnection.setRemoteDescription(
//                 new RTCSessionDescription(answer)
//               );
//             }
//           }
//         );

//         socket.on(
//           "ice-candidate",
//           ({
//             from,
//             candidate,
//           }: {
//             from: string;
//             candidate: RTCIceCandidateInit;
//           }) => {
//             const peerConnection = peerConnections.get(from);
//             if (peerConnection) {
//               peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//             }
//           }
//         );

//         socket.on("user-disconnected", (userId: string) => {
//           setRemoteStreams((prev) => {
//             const newStreams = new Map(prev);
//             newStreams.delete(userId);
//             return newStreams;
//           });
//           setPeerConnections((prev) => {
//             const newConnections = new Map(prev);
//             const peerConnection = newConnections.get(userId);
//             peerConnection?.close();
//             newConnections.delete(userId);
//             return newConnections;
//           });
//         });
//       })
//       .catch((error) => {
//         console.error("Error accessing media devices.", error);
//       });

//     return () => {
//       socket.off("user-list");
//       socket.off("user-joined");
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       socket.off("user-disconnected");
//     };
//   }, [peerConnections]);

//   return (
//     <div>
//       <h1>Video Chat</h1>
//       <input
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         placeholder="Room ID"
//       />
//       <div>
//         <h2>Local Video</h2>
//         <video ref={localVideoRef} autoPlay muted />
//       </div>
//       <div>
//         <h2>Connected Users</h2>
//         <ul>
//           {userList.map((userId) => (
//             <li key={userId}>User {userId}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         {Array.from(remoteStreams.entries()).map(([userId, stream]) => (
//           <div key={userId}>
//             <h2>User {userId}</h2>
//             <video
//               id={`remote-video-${userId}`}
//               autoPlay
//               playsInline
//               ref={(el) => {
//                 if (el) {
//                   el.srcObject = stream;
//                 }
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoCallRoom;

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const VideoCallRoom: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("66dd316e8df58bc214ff6797");
  const [peerConnections, setPeerConnections] = useState<
    Map<string, RTCPeerConnection>
  >(new Map());
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(
    new Map()
  );
  const [userList, setUserList] = useState<string[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  console.log("🚀 ~ remoteStreams:", remoteStreams);
  useEffect(() => {
    const constraints = {
      video: true,
      audio: true,
    };

    // Function to handle adding new peer connections
    const handleNewPeerConnection = (userId: string, stream: MediaStream) => {
      const peerConnection = new RTCPeerConnection();

      // Add local stream tracks to peer connection
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      // Handle incoming tracks
      peerConnection.ontrack = (event) => {
        console.log("🚀 ~ handleNewPeerConnection ~ event:", event);
        setRemoteStreams((prev) => {
          const newStreams = new Map(prev);
          newStreams.set(userId, event.streams[0]);
          return newStreams;
        });
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            to: userId,
            candidate: event.candidate,
          });
        }
      };

      return peerConnection;
    };

    // Fetch local media stream
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        socket.emit("create-room", roomId);

        socket.on("user-list", (users: string[]) => {
          setUserList(users);
        });

        socket.on("user-joined", (userId: string) => {
          const peerConnection = handleNewPeerConnection(userId, stream);

          peerConnection
            .createOffer()
            .then((offer) => {
              return peerConnection.setLocalDescription(
                new RTCSessionDescription(offer)
              );
            })
            .then(() => {
              socket.emit("offer", {
                to: userId,
                offer: peerConnection.localDescription,
              });
            });

          setPeerConnections((prev) =>
            new Map(prev).set(userId, peerConnection)
          );
        });

        socket.on(
          "offer",
          ({
            from,
            offer,
          }: {
            from: string;
            offer: RTCSessionDescriptionInit;
          }) => {
            const peerConnection = handleNewPeerConnection(from, stream);

            peerConnection
              .setRemoteDescription(new RTCSessionDescription(offer))
              .then(() => {
                return peerConnection.createAnswer();
              })
              .then((answer) => {
                return peerConnection.setLocalDescription(
                  new RTCSessionDescription(answer)
                );
              })
              .then(() => {
                socket.emit("answer", {
                  to: from,
                  answer: peerConnection.localDescription,
                });
              });

            setPeerConnections((prev) =>
              new Map(prev).set(from, peerConnection)
            );
          }
        );

        socket.on(
          "answer",
          ({
            from,
            answer,
          }: {
            from: string;
            answer: RTCSessionDescriptionInit;
          }) => {
            const peerConnection = peerConnections.get(from);
            if (peerConnection) {
              peerConnection.setRemoteDescription(
                new RTCSessionDescription(answer)
              );
            }
          }
        );

        socket.on(
          "ice-candidate",
          ({
            from,
            candidate,
          }: {
            from: string;
            candidate: RTCIceCandidateInit;
          }) => {
            const peerConnection = peerConnections.get(from);
            if (peerConnection) {
              peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            }
          }
        );

        socket.on("user-disconnected", (userId: string) => {
          setRemoteStreams((prev) => {
            const newStreams = new Map(prev);
            newStreams.delete(userId);
            return newStreams;
          });

          setPeerConnections((prev) => {
            const newConnections = new Map(prev);
            const peerConnection = newConnections.get(userId);
            peerConnection?.close();
            newConnections.delete(userId);
            return newConnections;
          });
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });

    return () => {
      socket.off("user-list");
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-disconnected");
    };
  }, [peerConnections]);

  return (
    <div>
      <h1>Video Chat</h1>
      <input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Room ID"
      />
      <div>
        <h2>Local Video</h2>
        <video ref={localVideoRef} autoPlay muted />
      </div>
      <div>
        <h2>Connected Users</h2>
        <ul>
          {userList.map((userId) => (
            <li key={userId}>User {userId}</li>
          ))}
        </ul>
      </div>
      <div>
        {Array.from(remoteStreams.entries()).map(([userId, stream]) => (
          <div key={userId}>
            <h2>User {userId}</h2>
            <video
              id={`remote-video-${userId}`}
              autoPlay
              playsInline
              ref={(el) => {
                if (el) {
                  el.srcObject = stream;
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCallRoom;
