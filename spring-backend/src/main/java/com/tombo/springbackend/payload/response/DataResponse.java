package com.tombo.springbackend.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class DataResponse<T> {
    private List<T> data;

    public DataResponse(List<T> data){
        this.data = data;
    }
}
