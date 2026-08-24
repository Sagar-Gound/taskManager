export const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
};

export const getStatus = (deadline, status) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    if (status === "DONE") {
        return now < deadlineDate ? "Achieved" : "In Progress";
    } else {
        return now > deadlineDate ? "Failed" : "In Progress";
    }
};

export const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const downloadFile = (data, contentType) => {
    const blob = new Blob([data], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `task-file-${new Date().toLocaleTimeString()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
