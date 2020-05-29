

import * as firebaseConfig from "../firebaseConfig"

async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
}


export async function submitToGoogle(imageUri_, callback_) {
    console.log(`GoogleCloudManager.submitToGoogle(): Attempting to recognize:  ${imageUri_}`);
    try {
        let body = JSON.stringify({
            requests: [
                {
                    features: [
                        // { type: "LABEL_DETECTION", maxResults: 10 },
                        // { type: "LANDMARK_DETECTION", maxResults: 5 },
                        // { type: "FACE_DETECTION", maxResults: 5 },
                        // { type: "LOGO_DETECTION", maxResults: 5 },
                        // { type: "TEXT_DETECTION", maxResults: 25 },
                        { type: "DOCUMENT_TEXT_DETECTION", maxResults: 25 },
                        // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                        // { type: "IMAGE_PROPERTIES", maxResults: 5 },
                        // { type: "CROP_HINTS", maxResults: 5 },
                        // { type: "WEB_DETECTION", maxResults: 5 }
                    ],
                    image: {
                        source: {
                            imageUri: imageUri_
                        }
                    }
                }
            ]
        });
        let response = await fetch(
            "https://vision.googleapis.com/v1/images:annotate?key=" +
            firebaseConfig.CLOUD_VISION_API,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: body
            }
        );
        let responseJson = await response.json();
        // console.log(`GoogleCloudManager.submitToGoogle(): Response:  ${responseJson}`);
        // console.log(responseJson);
        // this.setState({
        //     googleResponse: responseJson,
        //     uploading: false
        // });
        callback_(responseJson);
        return responseJson
    } catch (error) {
        console.log(`GoogleCloudManager.submitToGoogle(): ERROR:  ${error}`);
    }
}