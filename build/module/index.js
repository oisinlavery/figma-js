var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import axios from 'axios';
export var Client = function (opts) {
    var headers = opts.accessToken
        ? {
            Authorization: "Bearer " + opts.accessToken
        }
        : {
            'X-Figma-Token': opts.personalAccessToken
        };
    var client = axios.create({
        baseURL: "https://" + (opts.apiRoot || 'api.figma.com') + "/v1/",
        headers: headers
    });
    return {
        client: client,
        file: function (fileId, params) {
            if (params === void 0) { params = {}; }
            return client.get("files/" + fileId, { params: params });
        },
        fileVersions: function (fileId) { return client.get("files/" + fileId + "/versions"); },
        fileNodes: function (fileId, params) {
            return client.get("files/" + fileId + "/nodes", {
                params: __assign(__assign({}, params), { ids: params.ids.join(',') })
            });
        },
        fileImages: function (fileId, params) {
            return client.get("images/" + fileId, {
                params: __assign(__assign({}, params), { ids: params.ids.join(',') })
            });
        },
        fileImageFills: function (fileId) { return client.get("files/" + fileId + "/images"); },
        comments: function (fileId) { return client.get("files/" + fileId + "/comments"); },
        postComment: function (fileId, params) {
            return client.post("files/" + fileId + "/comments", params);
        },
        deleteComment: function (fileId, commentId) {
            return client.delete("files/" + fileId + "/comments/" + commentId);
        },
        me: function () { return client.get("me"); },
        teamProjects: function (teamId) { return client.get("teams/" + teamId + "/projects"); },
        projectFiles: function (projectId) { return client.get("projects/" + projectId + "/files"); },
        teamComponents: function (teamId, params) {
            if (params === void 0) { params = {}; }
            return client.get("teams/" + teamId + "/components", { params: params });
        },
        fileComponents: function (fileId, params) {
            if (params === void 0) { params = {}; }
            return client.get("files/" + fileId + "/components", { params: params });
        },
        component: function (key) { return client.get("components/" + key); },
        teamStyles: function (teamId, params) {
            if (params === void 0) { params = {}; }
            return client.get("teams/" + teamId + "/styles", { params: params });
        },
        fileStyles: function (fileId, params) {
            if (params === void 0) { params = {}; }
            return client.get("files/" + fileId + "/styles", { params: params });
        },
        style: function (key) { return client.get("styles/" + key); }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEtBQXNDLE1BQU0sT0FBTyxDQUFDO0FBbVMzRCxNQUFNLENBQUMsSUFBTSxNQUFNLEdBQUcsVUFBQyxJQUFtQjtJQUN4QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVztRQUM5QixDQUFDLENBQUM7WUFDRSxhQUFhLEVBQUUsWUFBVSxJQUFJLENBQUMsV0FBYTtTQUM1QztRQUNILENBQUMsQ0FBQztZQUNFLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1NBQzFDLENBQUM7SUFFTixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxjQUFXLElBQUksQ0FBQyxPQUFPLElBQUksZUFBZSxVQUFNO1FBQ3pELE9BQU8sU0FBQTtLQUNSLENBQUMsQ0FBQztJQUVILE9BQU87UUFDTCxNQUFNLFFBQUE7UUFFTixJQUFJLEVBQUUsVUFBQyxNQUFNLEVBQUUsTUFBVztZQUFYLHVCQUFBLEVBQUEsV0FBVztZQUFLLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFTLE1BQVEsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7UUFBekMsQ0FBeUM7UUFFeEUsWUFBWSxFQUFFLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFTLE1BQU0sY0FBVyxDQUFDLEVBQXRDLENBQXNDO1FBRTlELFNBQVMsRUFBRSxVQUFDLE1BQU0sRUFBRSxNQUFNO1lBQ3hCLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFTLE1BQU0sV0FBUSxFQUFFO2dCQUNsQyxNQUFNLHdCQUNELE1BQU0sS0FDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQzFCO2FBQ0YsQ0FBQztRQUxGLENBS0U7UUFFSixVQUFVLEVBQUUsVUFBQyxNQUFNLEVBQUUsTUFBTTtZQUN6QixPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBVSxNQUFRLEVBQUU7Z0JBQzdCLE1BQU0sd0JBQ0QsTUFBTSxLQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FDMUI7YUFDRixDQUFDO1FBTEYsQ0FLRTtRQUVKLGNBQWMsRUFBRSxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBUyxNQUFNLFlBQVMsQ0FBQyxFQUFwQyxDQUFvQztRQUU5RCxRQUFRLEVBQUUsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVMsTUFBTSxjQUFXLENBQUMsRUFBdEMsQ0FBc0M7UUFFMUQsV0FBVyxFQUFFLFVBQUMsTUFBTSxFQUFFLE1BQU07WUFDMUIsT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVMsTUFBTSxjQUFXLEVBQUUsTUFBTSxDQUFDO1FBQS9DLENBQStDO1FBRWpELGFBQWEsRUFBRSxVQUFDLE1BQU0sRUFBRSxTQUFTO1lBQy9CLE9BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFTLE1BQU0sa0JBQWEsU0FBVyxDQUFDO1FBQXRELENBQXNEO1FBRXhELEVBQUUsRUFBRSxjQUFNLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBaEIsQ0FBZ0I7UUFFMUIsWUFBWSxFQUFFLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFTLE1BQU0sY0FBVyxDQUFDLEVBQXRDLENBQXNDO1FBRTlELFlBQVksRUFBRSxVQUFBLFNBQVMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBWSxTQUFTLFdBQVEsQ0FBQyxFQUF6QyxDQUF5QztRQUVwRSxjQUFjLEVBQUUsVUFBQyxNQUFNLEVBQUUsTUFBVztZQUFYLHVCQUFBLEVBQUEsV0FBVztZQUNsQyxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBUyxNQUFNLGdCQUFhLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO1FBQXBELENBQW9EO1FBRXRELGNBQWMsRUFBRSxVQUFDLE1BQU0sRUFBRSxNQUFXO1lBQVgsdUJBQUEsRUFBQSxXQUFXO1lBQ2xDLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFTLE1BQU0sZ0JBQWEsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7UUFBcEQsQ0FBb0Q7UUFFdEQsU0FBUyxFQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBYyxHQUFLLENBQUMsRUFBL0IsQ0FBK0I7UUFFakQsVUFBVSxFQUFFLFVBQUMsTUFBTSxFQUFFLE1BQVc7WUFBWCx1QkFBQSxFQUFBLFdBQVc7WUFDOUIsT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVMsTUFBTSxZQUFTLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO1FBQWhELENBQWdEO1FBRWxELFVBQVUsRUFBRSxVQUFDLE1BQU0sRUFBRSxNQUFXO1lBQVgsdUJBQUEsRUFBQSxXQUFXO1lBQzlCLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFTLE1BQU0sWUFBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQztRQUFoRCxDQUFnRDtRQUVsRCxLQUFLLEVBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVUsR0FBSyxDQUFDLEVBQTNCLENBQTJCO0tBQzFDLENBQUM7QUFDSixDQUFDLENBQUMifQ==