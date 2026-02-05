package com.weatherapp.backend.model;

public class ServiceResult {
    private String source;
    private Object data;
    private String error;
    private int statusCode = 200;

    public ServiceResult() {}

    public ServiceResult(String source, Object data) {
        this.source = source;
        this.data = data;
    }
    
    public ServiceResult(String error, int statusCode) {
        this.error = error;
        this.statusCode = statusCode;
    }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }
}
